/**
 * @file util scripts
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const path = require('path');
const envConfig = require('./env');
const EVENT = process.env.npm_lifecycle_event || '';

/**
 * 获取当前构建环境
 *
 * @return {string} - 构建环境，dev | online | rd | qa
 */
exports.getBuildEnv = function () {
    const isBuild = EVENT.includes('build');

    // 本地开发版本构建
    let env = 'dev';

    if (isBuild) {

        // 在线版本构建
        env = 'online';

        if (EVENT.includes(':rd')) {

            // rd 环境版本构建
            env = 'rd';
        }

        if (EVENT.includes(':qa')) {

            // qa 环境版本构建
            env = 'qa';
        }

        if (EVENT.includes(':dev')) {
            env = 'dev';
        }
    }

    return env;
}

/**
 * 获取当前构建环境配置，格式如下
 *
 * {
 *     apiPrefix: 'api'
 * }
 *
 * @return {Object} - 构建环境配置
 */
exports.getBuildConfig = function () {
    const env = this.getBuildEnv();
    return envConfig.build[env];
}

/**
 * 获取当前代理环境
 *
 * @return {string} - 代理环境，rd | qa
 */
exports.getProxyEnv = function () {
    let env = 'rd';

    if (EVENT.includes(':qa')) {
        env = 'qa';
    }

    return env;
}

/**
 * 获取当前代理环境配置，格式如下
 *
 * {
 *     prefix: '/api/',
 *     host: 'http://proxy.com',
 *     port: 8080
 * }
 *
 * @return {Object} - 构建环境配置
 */
exports.getProxyConfig = function () {
    const env = this.getProxyEnv();
    return envConfig.proxy[env];
}

/**
 * 是否是代理模式
 *
 * @return {boolean}
 */
exports.isProxy = function () {
    return EVENT.includes('proxy');
}

/**
 * 是否是构建模式
 *
 * @return {boolean}
 */
exports.isBuild = function () {
    return EVENT.includes('build') && !this.isDev();
}

/**
 * 是否是构建模式
 *
 * @return {boolean}
 */
exports.isDev = function () {
    return EVENT.includes(':dev');
}

/**
 * 是否是 AOT 构建模式
 *
 * @return {boolean}
 */
exports.isAOT = function () {
    return EVENT.includes(':aot');
}

/**
 * 定位路径
 *
 * @param  {string} p 路径
 * @return {string}   绝对路径
 */
exports.root = function (p) {
    return path.resolve(__dirname, '..', p);
}
