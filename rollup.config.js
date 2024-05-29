import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/VirtualizedList/index.js',
  output: [
    {
      file: 'lib/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/bundle.esm.js',
      format: 'esm'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser()  // 压缩输出的代码
  ]
};