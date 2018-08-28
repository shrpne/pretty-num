import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    plugins: [
        commonjs(),
        resolve(),
        babel({
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }]],
        }),
    ],
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: 'prettyNum',
    }
};
