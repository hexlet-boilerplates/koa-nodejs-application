const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const babel = require('gulp-babel');
const Browser = require('browser-sync');
const repl = require('repl');
const webpackConfig = require('./webpack.config.js');


const serverJsPath = [
  '*/**/*.js',
  'index.js',
  'container.js',
  '!node_modules/**',
  '!dist/**',
  '!flow-typed/**',
  '!__tests__/**',
];

let server;
const devServer = Browser.create();
const bundler = webpack(webpackConfig);
bundler.hooks.done.tap('done', () => devServer.reload());

const clearCache = () => Object.keys(require.cache)
  .filter(p => !p.match(/node_modules/) && p.match(/dist/))
  .forEach(key => delete require.cache[key]);

const startServer = (done) => {
  const getServer = require('./dist').default; // eslint-disable-line
  server = getServer().listen(process.env.PORT || 4000, done);
};

const reloadServer = (done) => {
  server.close(() => {
    clearCache();
    startServer(done);
  });
};

const startDevServer = (done) => {
  devServer.init({
    open: false,
    notify: false,
    proxy: 'localhost:4000',
    port: 3000,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'silent',
      }),
    ],
  });
  done();
};

const reloadDev = (done) => {
  devServer.reload();
  done();
};

const copyViews = () => gulp.src('views/**/*.pug').pipe(gulp.dest('dist/views'));

const copyMisc = gulp.series(
  () => gulp.src('public/img/*').pipe(gulp.dest('dist/public/img')),
  () => gulp.src('config/*').pipe(gulp.dest('dist/config')),
);

const bundleClientJs = done => bundler.run(done);

const transpileServerJs = () => gulp.src(serverJsPath)
  .pipe(babel())
  .pipe(gulp.dest('dist'));

const clean = () => del(['dist']);

const watch = () => {
  gulp.watch(serverJsPath, gulp.series(transpileServerJs, reloadServer, reloadDev));
  gulp.watch('views/**/*.pug', gulp.series(copyViews, reloadDev));
};


const serverConsole = (done) => {
  const container = require('./dist/container').default; // eslint-disable-line
  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
  done();
};


const devServar = gulp.series(
  clean,
  copyMisc,
  copyViews,
  transpileServerJs,
  startServer,
  startDevServer,
  watch,
);


const prodBuild = gulp.series(
  clean,
  copyMisc,
  copyViews,
  transpileServerJs,
  bundleClientJs,
);


module.exports = {
  devServar,
  prodBuild,
  serverConsole,
};
