'use strict';

/**
 *  lecture controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::lecture.lecture', ({ strapi }) => ({
  async findwithSlug(ctx) {
    const { slug } = ctx.params;
    try {
      const result = await strapi.db.query('api::lecture.lecture').findOne({
        select: "*",
        where: {
          slug: slug
        },
        populate: ["*"]
      });

      return { result };
    }
    catch (err) {
      console.log(err);
    }
  }
}
));
