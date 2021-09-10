import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import html from '@web/rollup-plugin-html'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

const DEV_DEMO_PATH = 'demo/dev'

export function makeDemoBuild(mode = 'production', dir = DEV_DEMO_PATH, plugins = []) {
  return {
    input: 'demo/src/index.js',
    output: {
      dir,
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

export default () => makeDemoBuild('development', DEV_DEMO_PATH, [
  serve({
    verbose: true,
    contentBase: DEV_DEMO_PATH,
    host: 'localhost',
    port: 3000,
  }),
  livereload({ watch: ['demo/src', 'demo/public', 'src'] }),
])
