"use strict";

/**
 * A set of functions called "actions" for `attendees`
 */

module.exports = {
  find: async (ctx, next) => {
    const res = await strapi.query("user", "users-permissions").find(ctx.query);

    return res.map((attendee) => _beautifyAttendy(attendee));
  },
  beautifyAttendy: (attendee) => {
    return _beautifyAttendy(attendee);
  },
};

const _beautifyAttendy = (attendee) => {
  const whiteListedFields = [
    "aboutMe",
    "allowChats",
    "avatar",
    "blogUrl",
    "userCategory1",
    "userCategory2",
    "userCategory3",
    "userCategory4",
    "checkbox1",
    "checkbox2",
    "checkbox3",
    "company",
    "email",
    "extra1",
    "extra2",
    "extra3",
    "firstName",
    "hideMyProfile",
    "id",
    "instagramProfileUrl",
    "jobTitle",
    "lastName",
    "linkedInProfileUrl",
    "twitterProfileUrl",
    "xingProfileUrl",
  ];
  const obj = {};
  whiteListedFields.forEach((fieldKey) => {
    if (attendee.hasOwnProperty(fieldKey)) {
      if (fieldKey === "avatar") {
        obj[fieldKey] = {};
        if (
          attendee[fieldKey] &&
          attendee[fieldKey].formats &&
          attendee[fieldKey].formats.thumbnail &&
          attendee[fieldKey].formats.thumbnail.url
        ) {
          obj[fieldKey]["thumbnail"] = attendee[fieldKey].formats.thumbnail.url;
        }
        if (
          attendee[fieldKey] &&
          attendee[fieldKey].formats &&
          attendee[fieldKey].formats.small &&
          attendee[fieldKey].formats.small.url
        ) {
          obj[fieldKey]["small"] = attendee[fieldKey].formats.small.url;
        }
        if (Object.keys(obj[fieldKey]).length === 0) {
          delete obj[fieldKey];
        }
      } else {
        obj[fieldKey] = attendee[fieldKey];
      }
    }
  });
  return obj;
};
