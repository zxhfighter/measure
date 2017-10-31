const path = require('path');

/** 数据结构*/
class ComponentGroup {
    constructor(name) {
        this.name = name;
        this.id = `component-group-${name}`;
        this.aliases = [];
        this.docType = 'componentGroup';
        this.components = [];
        this.directives = [];
        this.services = [];
        this.additionalClasses = [];
        this.typeClasses = [];
        this.interfaceClasses = [];
        this.ngModule = null;
    }
}

module.exports = function componentGrouper() {
    return {
        $runBefore: ['docs-processed'],
        $process: function(docs) {
            let groups = new Map();

            docs.forEach(doc => {
                let basePath = doc.fileInfo.basePath;
                let filePath = doc.fileInfo.filePath;

                // 保持 `/src/app` 的目录结构
                let fileSep = path.relative(basePath, filePath).split(path.sep);
                let groupName = fileSep.slice(0, fileSep.length - 1).join('/');

                // 不存在时创建它
                let group;
                if (groups.has(groupName)) {
                    group = groups.get(groupName);
                } else {
                    group = new ComponentGroup(groupName);
                    groups.set(groupName, group);
                }

                if (doc.isComponent) {
                    group.components.push(doc);
                } else if (doc.isDirective) {
                    group.directives.push(doc);
                } else if (doc.isService) {
                    group.services.push(doc);
                } else if (doc.isNgModule) {
                    group.ngModule = doc;
                } else if (doc.docType === 'class') {
                    group.additionalClasses.push(doc);
                } else if (doc.docType === 'interface') {
                    group.interfaceClasses.push(doc);
                } else if (doc.docType === 'type') {
                    group.typeClasses.push(doc);
                }
            });

            return Array.from(groups.values());
        }
    };
};

// 生成所有方法
function genMethods(classDoc) {
    return classDoc.members.filter(member => member.hasOwnProperty('parameters'));
}

// 生成所有属性
function genProperties(classDoc) {
    return classDoc.members.filter(member => !member.hasOwnProperty('parameters'));
}

function hasMemberDecorator(doc, decoratorName) {
    return doc.docType == 'member' && hasDecorator(doc, decoratorName);
}

function hasClassDecorator(doc, decoratorName) {
    return doc.docType == 'class' && hasDecorator(doc, decoratorName);
}

function hasDecorator(doc, decoratorName) {
    return doc.decorators &&
        doc.decorators.length &&
        doc.decorators.some(d => d.name == decoratorName);
}
