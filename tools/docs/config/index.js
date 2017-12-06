const path = require('path');
const Dgeni = require('dgeni');
const DgeniPackage = Dgeni.Package;

const projectRootDir = path.resolve(__dirname, '../../..');
const sourceDir = path.resolve(projectRootDir, 'src/');
const outputDir = path.resolve(projectRootDir, 'dist/docs/api');
const templateDir = path.resolve(__dirname, './templates');

let apiDocsPackage =

    new DgeniPackage('xdesign-component-docs', [
        require('dgeni-packages/jsdoc'), // jsdoc Tag parsing and extracting
        require('dgeni-packages/nunjucks'), // The nunjucks template rendering engine. No longer in jsdoc - you must add this explicitly to your config or you will get Error
        require('dgeni-packages/typescript') // Tag parsing and extracting for TypeScript modules
    ])

    // 引入一序列需要处理文档处理器
    // .processor(require('./processors/link-inherited-docs'))
    .processor(require('./processors/docs-private-filter'))
    .processor(require('./processors/categorizer'))
    .processor(require('./processors/component-grouper'))

    // 设置源文件和输出路径
    .config(function (log, readFilesProcessor, writeFilesProcessor) {
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
    .config(function (computePathsProcessor) {
        computePathsProcessor.pathTemplates = [{
            docTypes: ['componentGroup'],
            pathTemplate: '${name}',
            outputPathTemplate: '${name}.html',
        }];
    })

    .config(function (parseTagsProcessor) {
        parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
            { name: 'docs-private' },
            { name: 'type' },
            { name: 'default' },
            { name: 'readonly' }
        ]);
    })

    // TypeScript 处理器
    .config(function (readTypeScriptModules) {
        // ts文件基准文件夹
        readTypeScriptModules.basePath = sourceDir;

        // 隐藏private变量
        readTypeScriptModules.hidePrivateMembers = true;

        // typescript 入口
        readTypeScriptModules.sourceFiles = [
            'component/**/index.ts'
        ];
    })

    // 设置模板引擎
    .config(function (templateFinder, templateEngine) {
        // 指定模板文件路径
        templateFinder.templateFolders = [templateDir];
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

        // dgeni disables autoescape by default, but we want this turned on.
        templateEngine.config.autoescape = true;

        // Nunjucks模板引擎，默认的标识会与Angular冲突
        templateEngine.config.tags = {
            variableStart: '{$',
            variableEnd: '$}'
        };
    });

module.exports = apiDocsPackage;
