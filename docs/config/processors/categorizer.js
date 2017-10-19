const _ = require('lodash');

/**
 * 黑名单选择器，排除某些不想生成文档的 selecotr
 */
const SELECTOR_BLACKLIST = new Set([

]);

/**
 * 对文档对象增加一些 `isMethod`、`isDirective` 等属性
 *
 * isMethod     | 是否类方法
 * isDirective  | 是否@Directive类
 * isComponent  | 是否@Component类
 * isService    | 是否@Injectable类
 * isNgModule   | 是否NgModule类
 */
module.exports = function categorizer() {
    return {
        $runBefore: ['docs-processed'],
        $process: function(docs) {
            docs.filter(doc => ~['class'].indexOf(doc.docType)).forEach(doc => decorateClassDoc(doc));
        }
    };

    /** 识别Component、Directive等 */
    function decorateClassDoc(classDoc) {
        // 将所有方法与属性写入doc中（包括继承）
        classDoc.methods = resolveMethods(classDoc);
        classDoc.properties = resolveProperties(classDoc);

        // 根据装饰器重新修改方法与属性
        classDoc.methods.forEach(doc => decorateMethodDoc(doc));
        classDoc.properties.forEach(doc => decoratePropertyDoc(doc));

        decoratePublicDoc(classDoc.properties);

        const component = isComponent(classDoc);
        const directive = isDirective(classDoc);
        if (component || directive) {
            classDoc.exportAs = getMetadataProperty(classDoc, 'exportAs');
            classDoc.selectors = getDirectiveSelectors(classDoc);
        }
        classDoc.isComponent = component;
        classDoc.isDirective = directive;
        if (isService(classDoc)) {
            classDoc.isService = true;
        } else if (isNgModule(classDoc)) {
            classDoc.isNgModule = true;
        }

        // 当使用是directiveInputAlias则去除引号
        classDoc.properties.forEach(p => {
            if (p.directiveInputAlias && p.directiveInputAlias.length > 1)
                p.directiveInputAlias = p.directiveInputAlias.substr(1, p.directiveInputAlias.length - 2);

            if (p.directiveOutputAlias && p.directiveOutputAlias.length > 1)
                p.directiveOutputAlias = p.directiveOutputAlias.substr(1, p.directiveOutputAlias.length - 2);
        });
    }

    /** 根据方法调用方式（例：参数列表）生成一些变量便于模板引擎使用 */
    function decorateMethodDoc(methodDoc) {
        normalizeMethodParameters(methodDoc);
        decoratePublicDoc(methodDoc);

        // 标记是否包含有返回值
        methodDoc.showReturns = methodDoc.returnType && methodDoc.returnType != 'void';
    }

    /** 根据属性调用方式（例：输入|出变量、是否可选等）生成一些变量便于模板引擎使用 */
    function decoratePropertyDoc(propertyDoc) {
        decoratePublicDoc(propertyDoc);

        // 是否输入参数
        propertyDoc.isDirectiveInput = isDirectiveInput(propertyDoc);
        propertyDoc.directiveInputAlias = getDirectiveInputAlias(propertyDoc);
        // 是否输出参数
        propertyDoc.isDirectiveOutput = isDirectiveOutput(propertyDoc);
        propertyDoc.directiveOutputAlias = getDirectiveOutputAlias(propertyDoc);

        
        const typeTag = (propertyDoc.tags && propertyDoc.tags.tags ||  []).find(tag => tag.tagName === 'type');
        if (typeTag && typeTag.typeExpression) {
            propertyDoc.returnType = typeTag.typeExpression;
        }
    }

    /** 是否包含过时装饰器 */
    function decoratePublicDoc(doc) {
        doc.isDeprecated = isDeprecatedDoc(doc);
    }
};

/** 收集所有公共方法文档（包括继承） */
function resolveMethods(classDoc) {
    let methods = classDoc.members.filter(member => member.hasOwnProperty('parameters'));

    if (classDoc.inheritedDoc) {
        methods = methods.concat(resolveMethods(classDoc.inheritedDoc));
    }

    return methods;
}

/** 收集所有公共属性文档（包括继承） */
function resolveProperties(classDoc) {
    let properties = classDoc.members.filter(member => !member.hasOwnProperty('parameters'));

    if (classDoc.inheritedDoc) {
        properties = properties.concat(resolveProperties(classDoc.inheritedDoc));
    }

    return properties;
}


/**
 * 提取所有参数属性，包括替换JsDoc的 `@param` 参数属性
 */
function normalizeMethodParameters(method) {
    if (method.parameters) {
        method.parameters.forEach(parameter => {
            let [parameterName, parameterType] = parameter.split(':');

            // 如果可选，则会包含 `?`
            let isOptional = false;
            if (parameterName.includes('?')) {
                isOptional = true;
                parameterName = parameterName.replace('?', '');
            }

            if (!method.params) {
                method.params = [];
            }

            let jsDocParam = method.params.find(p => p.name == parameterName);

            if (!jsDocParam) {
                jsDocParam = { name: parameterName };
                method.params.push(jsDocParam);
            }

            jsDocParam.type = parameterType.trim();
            jsDocParam.isOptional = isOptional;
        });
    }
}

function isComponent(doc) {
    return hasClassDecorator(doc, 'Component');
}

function isDirective(doc) {
    return hasClassDecorator(doc, 'Directive');
}

function isService(doc) {
    return hasClassDecorator(doc, 'Injectable')
}

function isNgModule(doc) {
    return hasClassDecorator(doc, 'NgModule');
}

function isDirectiveOutput(doc) {
    return hasMemberDecorator(doc, 'Output');
}

function isDirectiveInput(doc) {
    return hasMemberDecorator(doc, 'Input');
}

function isDeprecatedDoc(doc) {
    return (doc.tags && doc.tags.tags ||  []).some(tag => tag.tagName === 'deprecated');
}

function getDirectiveInputAlias(doc) {
    return isDirectiveInput(doc) ? doc.decorators.find(d => d.name == 'Input').arguments[0] : '';
}

function getDirectiveOutputAlias(doc) {
    return isDirectiveOutput(doc) ? doc.decorators.find(d => d.name == 'Output').arguments[0] : '';
}

function getDirectiveSelectors(classDoc) {
    const directiveSelectors = getMetadataProperty(classDoc, 'selector');

    if (directiveSelectors) {
        // 过滤黑名单
        return directiveSelectors.replace(/[\r\n]/g, '').split(/\s*,\s*/)
            .filter(s => s !== '' && !s.includes('mat') && !SELECTOR_BLACKLIST.has(s));
    }
}

function getMetadataProperty(doc, property) {
    const metadata = doc.decorators
        .find(d => d.name === 'Component' || d.name === 'Directive').arguments[0];

    // Use a Regex to determine the given metadata property. This is necessary, because we can't
    // parse the JSON due to environment variables inside of the JSON (e.g module.id)
    let matches = new RegExp(`${property}s*:\\s*(?:"|'|\`)((?:.|\\n|\\r)+?)(?:"|'|\`)`)
        .exec(metadata);

    return matches && matches[1].trim();
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
