/**
 * @file 拦截器中间件，将所有请求拦截至 app/mock 文件夹，用于本地数据开发
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

const qs = require('qs');
const path = require('path');

// 项目根目录
const root = '../';

/**
 * HTTP 请求中间件，用于将请求代理至本地文件夹
 *
 * @param  {Object}   req  - 请求对象
 * @param  {Object}   res  - 响应对象
 * @param  {Function} next - 函数对象
 * @return {Object}        - 根据请求信息，跳转到下一个请求中间件或者直接返回模拟文件
 */
module.exports = function (req, res, next) {

    const isXHR = req.headers['x-requested-with'] === 'XMLHttpRequest';
    const isHTML = /\.html$/g.test(req.url);

    // 文件上传专用mock，暂时先放这
    // if (/uploader$/g.test(req.url)) {
    //     const uploaderMockFile = require('../mockup/uploader');
    //     res.end(JSON.stringify(uploaderMockFile, 'utf-8'));
    // }

    // 非 ajax 请求或者 html 请求直接 pass
    if (!isXHR || isHTML) {
        return next();
    }

    // 路径，例如 /global/user/1
    let pathname = req._parsedUrl.pathname;

    // 路径中的实体ID，例如从 /global/user/1 中提取ID 1
    let id = pathname.match(/\/(\d{1,20})\/?$/);
    id = (id && id[1]);

    // URL参数
    let urlParams = qs.parse(req._parsedUrl.query);

    // 移除 id 后的路径，例如 /global/user/1 移除ID后为 /global/user
    if (id) {
        pathname = pathname.replace('/' + id, '');
        urlParams['_id'] = id;
    }

    // mock 文件
    const mockPath = path.join(root, 'mock/', req.method, pathname);

    // 删除缓存文件，避免修改 mock 数据后，刷新后还是请求的旧数据
    const moduleName = './' + mockPath;
    const cacheKey = path.resolve(__dirname, moduleName) + '.js';
    delete require.cache[cacheKey];

    // 请求最新数据
    const mockFile = require(moduleName);

    // 设置响应头
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');

    // 设置响应内容
    setTimeout(function () {
        res.end(JSON.stringify(mockFile(urlParams)), 'utf-8');
    }, 50000)
};
