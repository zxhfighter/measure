import {resolve} from 'path';

export const config = {
    appPath: resolve('./src'),
    moduleName: 'xdesign',
    dist: resolve('./dist/packages'),
    componentPath: resolve('./src/component'),
    umdPath: resolve('./dist/packages/bundle'),
    entry: resolve('./dist/packages/index.js'),
    tsconfigPath: resolve('./src/component/tsconfig.json'),
    scaffordPath: resolve('./scafford/component/**/*.**'),
    devAppOutPath: resolve('./dist/packages/devapp'),
    webpackConfigPath: resolve('./config')
};
