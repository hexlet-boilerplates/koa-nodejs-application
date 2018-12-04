import path from 'path';
import Koa from 'koa';
import Pug from 'koa-pug';
import Router from 'koa-router';
import koaLogger from 'koa-logger';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import flash from 'koa-flash-simple';
import _ from 'lodash';
import methodOverride from 'koa-methodoverride';

import addRoutes from './routes';
import container from './container';

export default () => {
  const app = new Koa();

  app.keys = ['some secret hurr'];
  app.use(session(app));
  app.use(flash());
  app.use(async (ctx, next) => {
    ctx.state = {
      flash: ctx.flash,
      isSignedIn: () => ctx.session.userId !== undefined,
    };
    await next();
  });
  app.use(bodyParser());
  app.use(methodOverride('_method'));

  app.use(serve(path.join(__dirname, 'public')));
  app.use(koaLogger());
  const router = new Router();
  addRoutes(router, container);
  app.use(router.allowedMethods());
  app.use(router.routes());

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    noCache: process.env.NODE_ENV !== 'production',
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    basedir: path.join(__dirname, 'views'),
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });
  pug.use(app);
  return app;
};
