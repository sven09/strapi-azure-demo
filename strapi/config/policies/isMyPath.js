module.exports = async (ctx, next) => {
  const pathId = ctx.params.id;

  if (ctx.state.user && ctx.state.user.id === pathId) {
    return await next();
  }
  ctx.unauthorized(`This is not your path hombre`);
};
