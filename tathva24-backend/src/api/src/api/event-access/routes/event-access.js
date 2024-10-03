'use strict';

/**
 * event-access router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::event-access.event-access');
