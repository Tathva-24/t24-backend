'use strict';

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::event.event', ({ strapi }) => ({
    async findwithSlug(ctx) {
        const { slug } = ctx.params;
        console.log(slug);
        try {
            const result = await strapi.db.query('api::event.event').findOne({
                select: "*",
                where: {
                    slug: slug
                },
                populate: ["*"]
            });

            return { result: result };
        }
        catch (err) {
            console.log(err);
            result = "Not Found"
            ctx.respond(404);
        }
        return { result: result };
    }
}
));
