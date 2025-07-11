import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)));

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.module, format: 'esm' },
      { file: pkg.main, format: 'cjs' }
    ],
    external: ['react', 'react-dom'],
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })]
  },
  {
    input: 'src/index.ts',
    output: { file: pkg.types, format: 'es' },
    plugins: [dts()]
  },
];
