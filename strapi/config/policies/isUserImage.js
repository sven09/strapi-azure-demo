module.exports = async (ctx, next) => {
  const mediaId = ctx.params.id;

  if (ctx.state.user) {
    const file = await strapi.plugins.upload.services.upload.fetch({
      id: mediaId,
    });
    if (file && file.related) {
      const relatedToCaller = file.related.find(
        (e) => e.id === ctx.state.user.id
      );
      if (relatedToCaller) {
        return await next();
      }
    }
  }

  ctx.unauthorized(`upload.`);
};
