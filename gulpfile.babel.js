import 'babel-polyfill';

import gulp from 'gulp';
import gutil from 'gulp-util';
import repl from 'repl';
import container from './src/container';
import init from './src/init';
import getServer from './src';

// gulp.task('default', console.log('hello!'));

gulp.task('console', () => {
  gutil.log = gutil.noop;
  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
});

gulp.task('init', async () => {
  await init();
  console.log('db was created');
});

gulp.task('server', (cb) => {
  getServer().listen(process.env.PORT || 3000, cb);
});
