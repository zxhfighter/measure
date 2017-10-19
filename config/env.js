/**
 * @file env variables
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

module.exports = {

    // 代理配置
    proxy: {

        // rd 代理环境
        rd: {
            prefix: '/api',
            host: 'http://cp01-top-db00.cp01.baidu.com',
            path: 'qianjing_cmo/web/index.php',
            port: 8080
        },

        // qa 代理环境
        qa: {
            prefix: '/qa',
            host: 'http://insight.baidu.com',
            port: 8081
        }
    },

    // 构建配置
    build: {

        // rd 环境构建
        rd: {
            apiPrefix: '/rd/'
        },

        // qa 环境构建
        qa: {
            apiPrefix: '/qa/'
        },

        // 本地环境构建
        dev: {
            apiPrefix: ''
        },

        // 线上环境构建
        online: {
            apiPrefix: 'http://insight.baidu.com/'
        }
    }
}
