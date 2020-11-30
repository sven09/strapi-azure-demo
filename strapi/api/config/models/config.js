"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterUpdate(result, params, data) {
      const obj = { ...result };
      delete obj.created_by;
      delete obj.updated_by;
      strapi.emitToAllUsers("config", obj);
    },
  },
};
