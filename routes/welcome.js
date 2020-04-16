// @ts-check

export default (router) => {
  router.get('root', '/', async (ctx) => {
    await ctx.render('welcome/index');
  });
};
