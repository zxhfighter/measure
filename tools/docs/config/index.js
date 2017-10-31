const path = require('path');
const Dgeni = require('dgeni');
const DgeniPackage = Dgeni.Package;

const projectRootDir = path.resolve(__dirname, '../../..');
const sourceDir = path.resolve(projectRootDir, 'src/component');
const outputDir = path.resolve(projectRootDir, 'dist/docs/api');

let apiDocsPackage =

    new DgeniPackage('xdesign-component-docs', [
        require('dgeni-packages/jsdoc'),
        require('dgeni-packages/nunjucks'),
        require('dgeni-packages/typescript')
    ])

// 引入一序列需要处理文档处理器
// .processor(require('./processors/link-inherited-docs'))
.processor(require('./processors/docs-private-filter'))
.processor(require('./processors/categorizer'))
.processor(require('./processors/component-grouper'))
// 设置源文件和输出路径
.config(function(log, readFilesProcessor, writeFilesProcessor) {
    // 设置日志等级
    log.level = 'info';

    // 设置项目根目录为基准路径
    readFilesProcessor.basePath = sourceDir;

    // disable for now as we are using readTypeScriptModules
    readFilesProcessor.$enabled = false;

    // 指定输出路径
    writeFilesProcessor.outputFolder = outputDir;
})

// 设置输出文件风格
.config(function(computePathsProcessor) {
    computePathsProcessor.pathTemplates = [{
        docTypes: ['componentGroup'],
        pathTemplate: '${name}',
        outputPathTemplate: '${name}.html',
    }];
})

.config(function(parseTagsProcessor) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
        { name: 'docs-private' },
        { name: 'type' },
        { name: 'default' },
        { name: 'readonly' }
    ]);
})

// TypeScript 处理器
.config(function(readTypeScriptModules) {
    // ts文件基准文件夹
    readTypeScriptModules.basePath = sourceDir;
    // 隐藏private变量
    readTypeScriptModules.hidePrivateMembers = true;
    // typescript 入口
    readTypeScriptModules.sourceFiles = [
        '*/**/index.ts'
    ];
})

// 设置模板引擎
.config(function(templateFinder, templateEngine) {
    // 指定模板文件路径
    templateFinder.templateFolders = [path.resolve(__dirname, './templates')];
    // 设置文件类型与模板之间的匹配关系
    templateFinder.templatePatterns = [
        '${ doc.template }',
        '${ doc.id }.${ doc.docType }.template.html',
        '${ doc.id }.template.html',
        '${ doc.docType }.template.html',
        '${ doc.id }.${ doc.docType }.template.js',
        '${ doc.id }.template.js',
        '${ doc.docType }.template.js',
        '${ doc.id }.${ doc.docType }.template.json',
        '${ doc.id }.template.json',
        '${ doc.docType }.template.json',
        'common.template.html'
    ];
    // Nunjucks模板引擎，默认的标识会与Angular冲突
    templateEngine.config.tags = {
        variableStart: '{$',
        variableEnd: '$}'
    };
});

module.exports = apiDocsPackage;
