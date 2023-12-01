'use strict';
const plugin_model = 'plugin::audit-trail.trail';

/** private function */

module.exports = ({ strapi }) => ({
  async flush(){
    try {
      await strapi.query(plugin_model).deleteMany({});
    } catch (error) {
      strapi.log.info('unable to flush audit trails');
    }

  },
});
