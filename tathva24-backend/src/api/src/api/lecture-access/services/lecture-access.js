'use strict';

/**
 * lecture-access service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lecture-access.lecture-access');
