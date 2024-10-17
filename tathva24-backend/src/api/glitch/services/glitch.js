'use strict';

/**
 * glitch service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::glitch.glitch');
