import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import pkg from './package.json'

const input = ['src/index.js']
const extensions = ['.js', '.jsx', '.json']
const commonPlugins = [
  peerDepsExternal(),
  nodeResolve({ extensions }),
  babel({ babelHelpers: 'bundled' }),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true,
  }),
]

export default [
  {
    // UMD
    input,
    plugins: [
      ...commonPlugins,
      terser(),
    ],
    output: {
      file: `umd/${pkg.name}.min.js`,
      format: 'umd',
      name: 'myLibrary', // this is the name of the global object
      esModule: false,
      exports: 'named',
      sourcemap: true,
    },
  },
  // ESM
  {
    input,
    plugins: commonPlugins,
    output: {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  },
  // CJS
  {
    input,
    plugins: [
      ...commonPlugins,
      terser(),
    ],
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  },
]
