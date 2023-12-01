'use strict';

module.exports = ({ strapi }) => ({
  flush(ctx) {
    ctx.body = strapi.plugin('audit-trail')
    .service('logService')
    .flush();
  },
});
