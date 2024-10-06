'use strict';

/**
 * pre-workshop service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pre-workshop.pre-workshop');
