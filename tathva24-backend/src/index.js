'use strict'

const { customAlphabet } = require('nanoid')

module.exports = {
	/**
	 * An asynchronous register function that runs before
	 * your application is initialized.
	 *
	 * This gives you an opportunity to extend code.
	 */
	register(/*{ strapi }*/) {},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap({ strapi }) {
		strapi.db.lifecycles.subscribe({
			models: ['api::tathva-user.tathva-user'],
			async beforeCreate(event) {
				console.log('hello');
        			let count=await strapi.documents('api::tathva-user.tathva-user').count()
				event.params.data.TathvaID =
					`T-${String(count + 1).padStart(6,'0')}`;
			},
		})

		//strapi.db.lifecycles.subscribe({
		//	models: ['api::workshop.workshop'],
		//	async afterCreate(event) {
		//		console.log('hello');
		//		 await strapi.plugins['email'].services.email.send({
		//			     to: 'astroanax@outlook.com',
		//			     from: 'tathva@testing.tathva.org', //e.g. single sender verification in SendGrid
		//			     subject: 'The Strapi Email plugin worked successfully',
		//			     text: 'Hello world!',
		//			     html: 'Hello world!',
		//		})
		//	},
		//})


	},
}









// 'use strict';

// module.exports = {
//   /**
//    * An asynchronous register function that runs before
//    * your application is initialized.
//    *
//    * This gives you an opportunity to extend code.
//    */
//   register(/*{ strapi }*/) {},

//   /**
//    * An asynchronous bootstrap function that runs before
//    * your application gets started.
//    *
//    * This gives you an opportunity to set up your data model,
//    * run jobs, or perform some special logic.
//    */
//   bootstrap(/*{ strapi }*/) {},
// };
