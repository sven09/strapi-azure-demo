"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(data) {
      const obj = { ...data };
      delete obj.created_by;
      delete obj.updated_by;
      obj.type = "tables";
      strapi.emitToAllUsers("content", obj);
    },
    async afterUpdate(result, params, data) {
      const obj = { ...result };
      delete obj.created_by;
      delete obj.updated_by;
      obj.type = "tables";
      strapi.emitToAllUsers("content", obj);
    },
  },
};
