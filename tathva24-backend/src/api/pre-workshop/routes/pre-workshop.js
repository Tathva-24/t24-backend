'use strict';

/**
 * pre-workshop router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;
const defaultRouter = createCoreRouter('api::pre-workshop.pre-workshop');

// Custom route for registering for a workshop
const customRoutes = [
  {
    method: 'POST',
    path: '/pre-workshop/register',  // Custom path for registration
    handler: 'custom-pre-workshop.registerForWorkshop',  // Controller function
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

// Export only custom routes
module.exports = {
  routes: customRoutes, // Only include the custom routes
};