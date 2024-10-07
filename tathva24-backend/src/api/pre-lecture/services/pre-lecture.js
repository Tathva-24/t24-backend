'use strict';

/**
 * pre-lecture service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pre-lecture.pre-lecture');
