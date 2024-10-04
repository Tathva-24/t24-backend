module.exports = {
	async regWebhook(ctx, next) {
		if (ctx.request.header['webhook-secret'] != process.env.WEBHOOK_SECRET) {
			return ctx.unauthorized()
		}
		try {
			data = ctx.request.body
			name = data?.name
			email = data?.email
			event = data?.event
			tathvaId = data?.tathvaId

			let userObj = []
			if (tathvaId) {
				userObj = await strapi.entityService.findMany('plugin::users-permissions.user', {
					filters: {
						tathvaId: { $eq: `${tathvaId}` },
					},
				})
			}
			if (email && !userObj[0]) {
				userObj = await strapi.entityService.findMany('plugin::users-permissions.user', {
					filters: {
						email: { $eq: `${email}` },
					},
				})
			}

			userObj = userObj[0]
			if (!userObj) {
				ctx.response.status = 200
				data.type = 'user not found'
				await strapi.entityService.create('api::log.log', {
					data: { data: data },
				})

				return
			}

			let regType
			let regObj = []
			regObj = await strapi.entityService.findMany('api::event.event', {
				filters: {
					name: { $eq: `${event}` },
				},
			})
			if (regObj[0]) {
				regType = 'event'
			}
			if (!regObj[0]) {
				regObj = await strapi.entityService.findMany('api::workshop.workshop', {
					filters: {
						name: { $eq: `${event}` },
					},
				})
				if (regObj[0]) {
					regType = 'workshop'
				}
			}
			if (!regObj[0]) {
				regObj = await strapi.entityService.findMany('api::lecture.lecture', {
					filters: {
						name: { $eq: `${event}` },
					},
				})
				if (regObj[0]) {
					regType = 'lecture'
				}
			}
			if (!regObj[0]) {
				regObj = await strapi.entityService.findMany('api::competition.competition', {
					filters: {
						title: { $eq: `${event}` },
					},
				})
				if (regObj[0]) {
					regType = 'competition'
				}
			}
			if (!regObj[0]) {
				ctx.response.status = 200
				data.type = 'event not found'
				await strapi.entityService.create('api::log.log', {
					data: { data: data },
				})

				return
			}
			regObj = regObj[0]

			if (regType === 'competition') {
				regObjPath = `api::user-competitions-detail.user-competitions-detail`
			} else {
				regObjPath = `api::user-${regType}-detail.user-${regType}-detail`
			}
			let registeredObj = []
			if (regType === 'competition') {
				registeredObj = await strapi.entityService.findMany(regObjPath, {
					filters: {
						user: { id: { $eq: `${userObj.id}` } },
						competition: { id: { $eq: `${regObj.id}` } },
					},
				})
			}
			if (regType === 'event') {
				registeredObj = await strapi.entityService.findMany(regObjPath, {
					filters: {
						teamMembers: { id: { $contains: `${userObj.id}` } },
						event: { id: { $eq: `${regObj.id}` } },
					},
				})
			}
			if (regType === 'workshop') {
				registeredObj = await strapi.entityService.findMany(regObjPath, {
					filters: {
						user: { id: { $eq: `${userObj.id}` } },
						workshop: { id: { $eq: `${regObj.id}` } },
					},
				})
			}
			if (regType === 'lecture') {
				registeredObj = await strapi.entityService.findMany(regObjPath, {
					filters: {
						user: { id: { $eq: `${userObj.id}` } },
						lecture: { id: { $eq: `${regObj.id}` } },
					},
				})
			}
			if (registeredObj[0]) {
				ctx.response.status = 200
				data.type = 'already registered'
				await strapi.entityService.create('api::log.log', {
					data: { data: data },
				})

				return
			}
			let response
			if (regType === 'competition') {
				response = await strapi.entityService.create(regObjPath, {
					data: {
						user: { id: userObj.id },
						competition: { id: regObj.id },
						verified: true,
						refCode: data?.refCode,
						publishedAt: new Date().getTime(),
					},
				})
			}
			if (regType === 'event') {
				response = await strapi.entityService.create(regObjPath, {
					data: {
						teamMembers: [{ id: userObj.id }],
						event: { id: regObj.id },
						verified: true,
						refCode: data?.refCode,
						publishedAt: new Date().getTime(),
					},
				})
			}
			if (regType === 'workshop') {
				response = await strapi.entityService.create(regObjPath, {
					data: {
						user: { id: userObj.id },
						workshop: { id: regObj.id },
						verified: true,
						refCode: data?.refCode,
						publishedAt: new Date().getTime(),
					},
				})
			}
			if (regType === 'lecture') {
				response = await strapi.entityService.create(regObjPath, {
					data: {
						user: { id: userObj.id },
						lecture: { id: regObj.id },
						verified: true,
						refCode: data?.refCode,
						publishedAt: new Date().getTime(),
					},
				})
			}
			ctx.response.status = 200
		} catch (error) {
			ctx.response.status = 200
			data = ctx.request.body
			data.type = 'unknown error'
			data.error = error
			await strapi.entityService.create('api::log.log', {
				data: { data: data },
			})

			return
		}
	},
}
