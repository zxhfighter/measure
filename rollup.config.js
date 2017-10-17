const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default {
    input: './dist/packages/index.js',

    output: {
        file: './dist/packages/bundle/xdesign.umd.js',
        format: 'umd',
        name: 'xdesign'
    },

    plugins: [
        resolve(),
        commonjs()
    ],

    external: [
        '@angular/core',
        '@angular/common'
    ],

    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common'
    }
}
