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
        let count=await strapi.documents('api::tathva-user.tathva-user').count()
				event.params.data.TathvaID =
					`T-${String(count + 1).padStart(6,'0')}`;
			},
		})
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
