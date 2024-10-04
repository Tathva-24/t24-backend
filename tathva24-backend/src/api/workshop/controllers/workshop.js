'use strict';

/**
 *  workshop controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::workshop.workshop', ({ strapi }) => ({
    async findwithSlug(ctx) {
        const { slug } = ctx.params;
        try {
            const result = await strapi.db.query('api::workshop.workshop').findOne({
                select: "*",
                where: {
                    slug: slug
                },
                populate: ["*"]
            });
            console.log(result);

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

