'use strict';

/**
 * workshop-access service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::workshop-access.workshop-access');
