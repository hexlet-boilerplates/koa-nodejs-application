import gulp from 'gulp';
// import gutil from 'gulp-util';
import repl from 'repl';
import container from './container';
import getServer from '.';

// gulp.task('default', console.log('hello!'));

gulp.task('console', () => {
  // gutil.log = gutil.noop;
  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
});

const port = process.env.PORT || 4000;
const address = '0.0.0.0';

gulp.task('server', (cb) => {
  getServer().listen(port, address, cb);
});
