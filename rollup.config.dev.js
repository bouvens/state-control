import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-import-css'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

export default {
  input: 'demo/src/index.js',
  output: {
    file: 'demo/dist/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.json'],
    }),
    css(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    serve({
      verbose: true,
      contentBase: ['', 'demo/public'],
      host: 'localhost',
      port: 3000,
    }),
    livereload({ watch: 'demo' }),
  ],
}
