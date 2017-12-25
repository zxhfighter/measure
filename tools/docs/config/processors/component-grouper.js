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
            let flagMap = {};

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
                    if (!flagMap[doc.name]) {
                        group.components.push(doc);
                        flagMap[doc.name] = true;
                    }
                } else if (doc.isDirective) {
                    group.directives.push(doc);
                } else if (doc.isService) {
                    if (!flagMap[doc.name]) {
                        group.services.push(doc);
                        flagMap[doc.name] = true;
                    }
                } else if (doc.isNgModule) {
                    group.ngModule = doc;
                } else if (doc.docType === 'class') {
                    group.additionalClasses.push(doc);
                } else if (doc.docType === 'interface') {
                    if (!flagMap[doc.name]) {
                        group.interfaceClasses.push(doc);
                        flagMap[doc.name] = true;
                    }
                } else if (doc.docType === 'type') {
                    if (!flagMap[doc.name]) {
                        group.typeClasses.push(doc);
                        flagMap[doc.name] = true;
                    }
                }
            });

            return Array.from(groups.values());
        }
    };
};
