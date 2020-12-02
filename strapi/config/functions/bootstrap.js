"use strict";

//import file from './setup.xlsx'
require("dotenv").config({ path: "./.env" });
const socket = require("socket.io");
const UUID = require("uuid");
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

const XLSX = require("xlsx");
const BOOTSTRAP_DATA = XLSX.readFile("./setup.xlsx").Sheets;

async function bootstrap_resourceCollection(resource_type, resource_service, resourcesProp) {
  let resources;
  if (!resourcesProp){
    resources = XLSX.utils.sheet_to_json(BOOTSTRAP_DATA[resource_type]);
  }else{
    resources = resourcesProp;
  }
  for (let resource of resources) {
    strapi.log.info("resource:", resource);
    if (!resource_service || (await resource_service.count(resource)) === 0) {

      await resource_service.create(resource);
    }
  }
}
async function bootstrap_resourceSingle(resource_type, resource_service) {
  const resources = XLSX.utils.sheet_to_json(BOOTSTRAP_DATA[resource_type]);
  for (let resource of resources) {
    await resource_service.createOrUpdate(resource);
  }
}

async function bootstrap_admin() {
  // if (process.env.NODE_ENV === 'development') {
  const params = {
    username: process.env.ADMIN_USER || "admin",
    password: process.env.ADMIN_PASS || "start1",
    firstname: process.env.ADMIN_USER || "Admin",
    lastname: process.env.ADMIN_USER || "Admin",
    email: process.env.ADMIN_EMAIL || "apps@efec.de",
    blocked: false,
    isActive: true,
  };
  //Check if any account exists.
  const admins = await strapi.query("user", "admin").find();

  if (admins.length === 0) {
    try {
      let tempPass = params.password;
      let verifyRole = await strapi
        .query("role", "admin")
        .findOne({ code: "strapi-super-admin" });
      if (!verifyRole) {
        verifyRole = await strapi.query("role", "admin").create({
          name: "Super Admin",
          code: "strapi-super-admin",
          description:
            "Super Admins can access and manage all features and settings.",
        });
      }
      params.roles = [verifyRole.id];
      params.password = await strapi.admin.services.auth.hashPassword(
        params.password
      );
      await strapi.query("user", "admin").create({
        ...params,
      });
      strapi.log.info("Admin account was successfully created.");
      strapi.log.info(`Email: ${params.email}`);
      strapi.log.info(`Password: ${tempPass}`);
    } catch (error) {
      strapi.log.error(
        `Couldn't create Admin account during bootstrap: `,
        error
      );
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
  const role_orm = strapi.query("permission", "users-permissions").model;

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
  const permission_orm = strapi.query("permission", "users-permissions").model;

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
  const permission_orm = strapi.query("permission", "users-permissions").model;

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

const findRole = async (typeSearch) => {
  const result = await strapi
    .query("role", "users-permissions")
    .findOne({ type: typeSearch });
  return result;
};

const setDefaultPermissions = async (typeSearch) => {
  let singleTypes = [
    'assets', 'config', 'container', 'layout', 'mappings', 'registration', 'settings', 'style', 'texts',
  ]
  const role = await findRole(typeSearch);
  const permissions = await strapi
    .query("permission", "users-permissions")
    .find({ type: "application", role: role.id, action: "find" });
  switch (typeSearch) {
    case 'public':
      await Promise.all(
        permissions.map(p => {
          if (singleTypes.includes(p.controller)) {
            strapi
              .query("permission", "users-permissions")
              .update({ id: p.id }, { enabled: true })
          }
        })
      );
      break;
    case 'authenticated':
      await Promise.all(
        permissions.map(p => {
          strapi
            .query("permission", "users-permissions")
            .update({ id: p.id }, { enabled: true })
        })
      );
      break;
    default:
      break;
  }

};

//const isFirstRun = async () => {
//  const pluginStore = strapi.store({
//    environment: strapi.config.environment,
//    type: "type",
//    name: "setup"
//  });
//  const initHasRun = await pluginStore.get({ key: "initHasRun" });
//  await pluginStore.set({ key: "initHasRun", value: true });
//  return !initHasRun;
//};

const bootstrap_register = async () => {
  await strapi.services.registration.createOrUpdate(
    {
      "isInitialized": "true", "fields": [
        { "fieldId": "firstName", "step": "1", "isRequired": "true", "fieldType": "text", "fieldLabel": "Firstname", "order": "10", },
        { "fieldId": "lastName", "step": "1", "isRequired": "true", "fieldType": "text", "fieldLabel": "Lastname" , "order": "20", },
        { "fieldId": "email", "step": "1", "isRequired": "true", "fieldType": "email", "fieldLabel": "E-Mail" , "order": "30", },
        { "fieldId": "password", "step": "1", "isRequired": "true", "fieldType": "password", "fieldLabel": "Password", "fieldHint": "Must be at least 6 characters long!", "order": "40",  },
        { "fieldId": "jobTitle", "step": "2", "isRequired": "false", "fieldType": "text", "fieldLabel": "Jobtitle" , "order": "50", },
        { "fieldId": "company", "step": "2", "isRequired": "false", "fieldType": "text", "fieldLabel": "Company" , "order": "60", },
        { "fieldId": "avatar", "step": "2", "isRequired": "false", "fieldType": "image", "fieldLabel": "Avatar" , "order": "70", },
        { "fieldId": "aboutMe", "step": "2", "isRequired": "false", "fieldType": "textArea", "fieldLabel": "About Me" , "order": "80", },
      ]
    }
  );
}

const bootstrap_category = async () => {
  if (!strapi.services.category) {
    await strapi.services.category.create(
      {
        "title": "example", "key":"key", "minCount":"0", "maxCount":"5", "backgroundColor":"#FFFFFF", "textColor":"#000000", 
         "categoryItems": [
          { "title": "exampleItem1", "key": "value","backgroundColor":"#FFFFFF", "textColor":"#000000", "icon": "" },
          { "title": "exampleItem2", "key": "value","backgroundColor":"#FFFFFF", "textColor":"#000000", "icon": "" },
        ]
      }
    );
  }
}

module.exports = async () => {
  // Bootstrap the super user
  await bootstrap_admin();

  const users = [];

  const mySocket = socket(strapi.server);
  // listen for user connection
  mySocket.on("connection", function (socket) {
    socket.user_id = UUID.v4();
    console.log("a user connected");
    users.push(socket);

    socket.on("disconnect", () => {
      users.forEach((user, i) => {
        // delete saved user when they disconnect
        if (user.user_id === socket.user_id) users.splice(i, 1);
      });
    });
  });
  strapi.io = mySocket; // register socket io inside strapi main object to use it globally anywhere
  strapi.emitToAllUsers = (topic, data) => {
    mySocket.emit(topic, data);
  };

  await bootstrap_resourceCollection("expo", strapi.services.expo);
  await bootstrap_resourceCollection("schedule", strapi.services.schedule);
  await bootstrap_resourceCollection("stage", strapi.services.stage);
  await bootstrap_resourceCollection("speaker", strapi.services.speaker);
  await bootstrap_resourceCollection("vote", strapi.services.vote);
  await bootstrap_resourceCollection("breakout", strapi.services.breakout);
  await bootstrap_resourceCollection("notification", strapi.services.notification);
  await bootstrap_resourceCollection("support", strapi.services.support);
  await bootstrap_resourceCollection("table", strapi.services.table);
  await bootstrap_resourceCollection("ticket", strapi.services.ticket);
  await bootstrap_resourceCollection("contentitem", strapi.services.contentitem);

  await bootstrap_resourceSingle("assets", strapi.services.assets);
  await bootstrap_resourceSingle("config", strapi.services.config);
  await bootstrap_resourceSingle("container", strapi.services.container);
  await bootstrap_resourceSingle("layout", strapi.services.layout);
  await bootstrap_resourceSingle("mappings", strapi.services.mappings);
  await bootstrap_register();
  //await bootstrap_category();
  //await bootstrap_resourceSingle("registration", strapi.services.registration);
  await bootstrap_resourceSingle("settings", strapi.services.settings);
  await bootstrap_resourceSingle("style", strapi.services.style);
  await bootstrap_resourceSingle("texts", strapi.services.texts);



  await setDefaultPermissions('public');
  await setDefaultPermissions('authenticated');


};
