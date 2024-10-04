'use strict'

/**
 *  order controller
 */

const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
	startPayment: async (ctx) => {
		const { nanoid } = require('nanoid')
		const axios = require('axios')

		const { user, paymentType, entity, refCode, donationAmount } = ctx.request.body
		if (user.id !== ctx.state.user.id) {
			return ctx.unauthorized('Invalid User Id')
		}

		let orderObj = {
			user,
			paymentType,
			refCode,
			isPaymentCompleted: false,
		}
		let orderAmount

		if (paymentType === 'donation') {
			if (typeof donationAmount !== 'number') {
				return ctx.badRequest('Please enter an amount to pay')
			}
			orderObj.donationAmount = donationAmount
			orderAmount = donationAmount
		} else {
			if (typeof entity === 'undefined') {
				return ctx.badRequest('Please enter a valid entity')
			}
			orderObj.entity = { id: entity.id }

			if (paymentType !== 'event' && paymentType !== 'workshop' && paymentType !== 'lecture') {
				return ctx.badRequest('Invalid payment type')
			}
			const found = await strapi.entityService.findOne(
				`api::${paymentType}.${paymentType}`,
				entity.id
			)
			if (found === null) {
				return ctx.badRequest('Invalid entity id')
			}
			if (found.currentRegCount >= found.maxRegCount) {
				return ctx.badRequest('Max capacity has been reached')
			}
			if (found.regPrice === 0) {
				return ctx.badRequest('Registration is free')
			}

			orderAmount = Math.floor(found.regPrice * 100)

			let existing = await strapi.entityService.findMany('api::order.order', {
				filters: {
					user: orderObj.user.id,
					paymentType: orderObj.paymentType,
					entity: JSON.stringify(orderObj.entity),
				},
			})

			if (existing?.length > 0) {
				return { orderId: existing.orderId }
			}
		}


		const razorpayBody = {
			amount: orderAmount,
			currency: 'INR',
			receipt: nanoid(),
		}
		try {
			const response = await axios.post('https://api.razorpay.com/v1/orders', razorpayBody, {
				headers: {
					Authorization: `Basic ${Buffer.from(
						`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
					).toString('base64')}`,
				},
			})
			orderObj.orderId = response.data.id
			orderObj.receipt = response.data.receipt
			await strapi.entityService.create('api::order.order', {
				data: {
					...orderObj,
					publishedAt: new Date(),
				},
			})
			return { orderId: response.data.id }
		} catch (error) {
			console.log(error);
			return ctx.badRequest("Payment Failed");
		}
	},
	async onPaymentComplete(ctx) {
		const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')

		let check = validateWebhookSignature(JSON.stringify(ctx.request.body), ctx.request.headers['x-razorpay-signature'], process.env.RAZORPAY_KEY_SECRET)
		//if (!check) {
		//	return ctx.unauthorized('Lies')
		//}

		let orderId = ctx.request.body.payload.payment.entity['order_id']
		let orderObj = await strapi.entityService.findMany("api::order.order", {
			filters: {
				orderId
			}
		})



		orderObj = await strapi.entityService.update("api::order.order", orderObj[0].id, {
			data: {
				isPaymentComplete: true
			},
			populate: "*"

		})
		if (
			orderObj.paymentType === 'event' ||
			orderObj.paymentType === 'workshop' ||
			orderObj.paymentType === 'lecture'
		) {
			const event = await strapi.entityService.findOne(`api::${orderObj.paymentType}.${orderObj.paymentType}`, orderObj.entity.id)
			console.log(event.currRegCount)
			await strapi.entityService.update(`api::${orderObj.paymentType}.${orderObj.paymentType}`, orderObj.entity.id, {
				data: {
					currRegCount: parseInt(event.currRegCount, 10) + 1
				}
			})
		}

		switch (orderObj.paymentType) {
			case 'event':
				const eventDetail = {
					event: orderObj.entity,
					teamMembers: [orderObj.user],
					eventRefCode: orderObj.refCode,
					status: 'participating',
					metaValues: { teamCreatedBy: orderObj?.user?.id },
					teamleader: orderObj.user,
					publishedAt: new Date()
				}
				await strapi.service("api::user-event-detail.user-event-detail").create({ data: eventDetail })
				break

			case 'workshop':
				const workshopDetail = {
					workshop: orderObj.entity,
					user: orderObj.user,
					workshopRefCode: orderObj.refCode,
					publishedAt: new Date()
				}
				await strapi.service("api::user-workshop-detail.user-workshop-detail").create({ data: workshopDetail })
				break
			case 'lecture':
				const lectureDetail = {
					lecture: orderObj.entity,
					user: orderObj.user,
					lectureRefCode: orderObj.refCode,
					publishedAt: new Date()
				}
				await strapi.services['api::user-lecture-detail.user-lecture-detail'].create({ data: lectureDetail })
				break
		}

		return { status: 'ok' }
	},
}))
