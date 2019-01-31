import pump from 'pump';
import { dest, parallel, series, src, task } from 'gulp';
import david from '@cedx/gulp-david';
import eslint from 'gulp-eslint';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';

import { resolve } from 'path';
import del = require('del');

const srcRoot = resolve('src');
const srcTSGlob = [resolve(srcRoot, '**/*.ts'), '!*.ts'];

const distRoot = resolve('dist');

task('deps:check', cb => {
    pump([
        src(srcTSGlob),
        david()
    ], cb);
});

task('dist:clean', () => {
    return del(distRoot);
});

const tsProject = typescript.createProject('tsconfig.json');
const uglifyOptions = {
    compress: {
        drop_console: true,
        warnings: true
    },
    mangle: {
        toplevel: true
    }
}
task('ts:build', cb => {
    pump([
        src(srcTSGlob),
        tsProject(),
        uglify(uglifyOptions),
        dest(distRoot)
    ], cb);
});

const eslintOptions = {
    fix: true
}
task('ts:check', cb => {
    pump([
        src(srcTSGlob),
        eslint(eslintOptions),
        eslint.format(),
        eslint.failAfterError(),
        dest(srcRoot)
    ], cb)
})

task('build', series(
    'dist:clean',
    'ts:build'
));

task('check', parallel(
    'deps:check',
    'ts:check'
));

task('precommit', parallel(

));