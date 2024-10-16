'use strict';

/**
 * user-reg service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-reg.user-reg');
