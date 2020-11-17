"use strict";
const socket = require("socket.io");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

/**
 *
 */
async function bootstrap_admin() {
    // if (process.env.NODE_ENV === 'development') {
      const params = {
        username: process.env.ADMIN_USER || 'admin',
        password: process.env.ADMIN_PASS || 'start1',
        firstname: process.env.ADMIN_USER || 'Admin',
        lastname: process.env.ADMIN_USER || 'Admin',
        email: process.env.ADMIN_EMAIL || 'apps@efec.de',
        blocked: false,
        isActive: true,
      };
      //Check if any account exists.
      const admins = await strapi.query('user', 'admin').find();
  
      if (admins.length === 0) {
       try {
          let tempPass = params.password;
          let verifyRole = await strapi.query('role', 'admin').findOne({ code: 'strapi-super-admin' });
          if (!verifyRole) {
          verifyRole = await strapi.query('role', 'admin').create({
            name: 'Super Admin',
            code: 'strapi-super-admin',
            description: 'Super Admins can access and manage all features and settings.',
           });
          }
          params.roles = [verifyRole.id];
          params.password = await strapi.admin.services.auth.hashPassword(params.password);
          await strapi.query('user', 'admin').create({
            ...params,
          });
          strapi.log.info('Admin account was successfully created.');
          strapi.log.info(`Email: ${params.email}`);
          strapi.log.info(`Password: ${tempPass}`);
        } catch (error) {
          strapi.log.error(`Couldn't create Admin account during bootstrap: `, error);
        }
      }
    // }

    
//   strapi.log.info(`Bootstrapping Admin`);

//   const admin_orm = strapi.query("user", "admin");

//   const admins = await admin_orm.find({ username: process.env.ADMIN_USERNAME });

//   if (admins.length === 0) {
//     const blocked = false;
//     const username = process.env.ADMIN_USER;
//     const password = await strapi.admin.services.auth.hashPassword(
//       process.env.ADMIN_PASS
//     );
//     const email = process.env.ADMIN_EMAIL;
//     const user = { blocked, username, password, email };

//     await admin_orm.create(user);

//     strapi.log.warn(`Bootstrapped Admin User: ${JSON.stringify(user)}`);
//   }
}

/**
 *
 */
async function get_roles() {
  const role_orm = strapi.plugins["users-permissions"].queries(
    "role",
    "users-permissions"
  );

  const role_list = await role_orm.find({}, []);

  const roles = {};

  for (let role of role_list) {
    roles[role._id] = role;
    roles[role.name] = role;
  }

  return roles;
}

/**
 *
 */
async function get_permissions(
  selected_role,
  selected_type,
  selected_controller
) {
  const roles = await get_roles();
  const permission_orm = strapi.plugins["users-permissions"].queries(
    "permission",
    "users-permissions"
  );

  let permission_list = await permission_orm.find({ _limit: 999 }, []);

  if (selected_role)
    permission_list = permission_list.filter(
      ({ role }) => `${role}` === `${roles[selected_role]._id}`
    );
  if (selected_type)
    permission_list = permission_list.filter(
      ({ type }) => `${type}` === `${selected_type}`
    );
  if (selected_controller)
    permission_list = permission_list.filter(
      ({ controller }) => `${controller}` === `${selected_controller}`
    );

  return permission_list;
}

/**
 *
 */
async function enable_permissions(role, type, controller) {
  strapi.log.info(`Setting '${controller}' permissions for '${role}'`);

  const permission_orm = strapi.plugins["users-permissions"].queries(
    "permission",
    "users-permissions"
  );

  const permissions = await get_permissions(role, type, controller);

  for (let { _id } of permissions) {
    permission_orm.update({ _id }, { enabled: true });
  }
}

/**
 *
 */
function getModel(name) {
  if (strapi.contentTypes[`application::${name}.${name}`]) {
    const contentType = strapi.contentTypes[`application::${name}.${name}`];
    const fields = [];
    Object.keys(contentType.attributes).forEach((key) => {
      const field = contentType.attributes[key];
      if (!field.hasOwnProperty("configurable")) {
        fields.push({ uid: key, ...field });
      }
    });
    return fields;
  }
  return null;
}

module.exports = async () => {
  
    // Bootstrap the super user
    await bootstrap_admin();
    
    const users = [];
    // import socket io
  
    // const mySocket = socket(strapi.server);
    // // listen for user connection
    // mySocket.on("connection", function (socket) {
    //   socket.user_id = UUID.v4();
    //   console.log("a user connected");
    //   users.push(socket);
  
    //   socket.on("disconnect", () => {
    //     users.forEach((user, i) => {
    //       // delete saved user when they disconnect
    //       if (user.user_id === socket.user_id) users.splice(i, 1);
    //     });
    //   });
    // });
    // strapi.io = mySocket; // register socket io inside strapi main object to use it globally anywhere
    // strapi.emitToAllUsers = (topic, data) => {
    //   mySocket.emit(topic, data);
    // };
};