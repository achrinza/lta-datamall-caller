/**
 * Copyright © 2019 Rifa Achrinza
 * 
 * SPDX-License-Identifier: MIT
 */


import pump from 'pump';
import { dest, parallel, series, src, task } from 'gulp';
import { david } from '@cedx/gulp-david';
import eslint from 'gulp-eslint';
import exec from 'gulp-exec';
import prettier from 'gulp-prettier';
import typescript from 'gulp-typescript';
import uglify from 'gulp-uglify';

import { resolve } from 'path';
import del = require('del');

const srcRoot = resolve('src');
const srcTSGlob = [resolve(srcRoot, '**/*.ts'), '!**/*.spec.ts'];
const srcTSNoDefGlob = [...srcTSGlob, '!**/*.d.ts'];

const distRoot = resolve('dist');
const distJSNoDefGlob = resolve(distRoot, '**/*.js')

task('deps:check', cb => {
    pump([
        src('package.json'),
        david()
    ], cb);
});

task('dist:clean', () => {
    return del(distRoot);
});


const eslintOptions = {
    fix: true
}
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
        dest(distRoot)
    ], cb);
});

task('ts:check', cb => {
    pump([
        src(srcTSNoDefGlob),
        eslint(eslintOptions),
        eslint.format(),
        eslint.failAfterError(),
        prettier(),
        prettier.check(),
        dest(srcRoot)
    ], cb);
});

task('ts:test', cb => {
    pump([
        exec('npm t'),
        exec.reporter()
    ], cb);
});

task('ts:minify', cb => {
    pump([
        src(distJSNoDefGlob),
        uglify(uglifyOptions),
        dest(distRoot)
    ], cb);
});

task('build', series(
    'dist:clean',
    parallel(
        'ts:build',
        'ts:check'
    ),
    'ts:minify'
));

task('check', parallel(
    'deps:check',
    'ts:check'
));

task('test', parallel(
    'ts:test'
));

task('precommit', parallel(
    'check',
    // 'test'
));