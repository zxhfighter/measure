import {resolve} from 'path';

export const config = {
    appPath: resolve('./src'),
    moduleName: 'xdesign',
    dist: resolve('./dist/packages'),
    componentPath: resolve('./src/component'),
    demoPath: resolve('./src/demo'),
    umdPath: resolve('./dist/packages/bundle'),
    entry: resolve('./dist/packages/index.js'),
    tsconfigPath: resolve('./src/component/tsconfig.json'),
    scaffordPath: resolve('./scafford/component/**/*.**'),
    scaffordDemoPath: resolve('./scafford/demo/**/*.**'),
    devAppOutPath: resolve('./dist/packages/devapp'),
    webpackConfigPath: resolve('./config')
};
