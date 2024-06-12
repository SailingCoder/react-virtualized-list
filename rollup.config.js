import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/VirtualizedListV2/index.ts', // 入口文件为 TypeScript
  output: [
    {
      file: 'lib/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'lib/bundle.umd.js',
      format: 'umd',
      name: 'ReactVirtualizedList'
    }
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript(), // 指定 tsconfig 文件
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
        '@babel/preset-typescript' // 添加对 TypeScript 的支持
      ],
    }), // 处理 ESNext 特性和 React JSX
    terser(), // 压缩代码
  ]
};

export default config;
