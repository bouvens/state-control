import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import html from '@web/rollup-plugin-html'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

export function makeDemoBuild(mode = 'production', plugins = []) {
  return {
    input: 'demo/src/index.js',
    output: {
      dir: 'demo/dist',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({
        extensions: ['.js', '.jsx', '.json'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(mode),
        preventAssignment: true,
      }),
      babel({ babelHelpers: 'bundled' }),
      commonjs(),
      html({
        input: 'demo/src/index.html',
        minify: true,
        transformHtml: [(code) => code.replace('!!version!!', pkg.version)],
      }),
      ...plugins,
    ],
  }
}

export default () => makeDemoBuild('development', [
  serve({
    verbose: true,
    contentBase: 'demo/dist',
    host: 'localhost',
    port: 3000,
  }),
  livereload({ watch: 'demo' }),
])
