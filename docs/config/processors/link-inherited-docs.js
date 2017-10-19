const ts = require('typescript');
const glob = require('glob');

/** 解决文档继承问题 */
module.exports = function linkInheritedDocs(readTypeScriptModules, tsParser) {

    let checker = null;
    return {
        $runAfter: ['readTypeScriptModules'],
        $runBefore: ['categorizer'],
        $process: processDocs,
    };

    function processDocs(docs) {
        const { sourceFiles, basePath } = readTypeScriptModules;
        let filePaths = [];
        sourceFiles.forEach(function(patther) {
            filePaths = filePaths.concat(glob.sync(patther, {cwd: basePath}));
        });
        checker = tsParser.parse(filePaths, basePath).typeChecker;
        docs.filter(doc => doc.docType === 'class').forEach(classDoc => {
            resolveInheritedDoc(classDoc, docs);
        });
    }

    function resolveInheritedDoc(classDoc, docs) {
        let inheritedType = resolveInheritedType(classDoc.exportSymbol);
        let inheritedSymbol = inheritedType && inheritedType.symbol;

        if (inheritedSymbol) {
            classDoc.inheritedSymbol = inheritedSymbol;
            classDoc.inheritedDoc = docs.find(doc => doc.exportSymbol === inheritedSymbol);
        }
    }

    function resolveInheritedType(classSymbol) {
        if (!classSymbol) {
            return null;
        }

        if (classSymbol.flags & ~ts.SymbolFlags.Class) {
            return;
        }

        let declaration = classSymbol.valueDeclaration || classSymbol.declarations[0];
        let typeExpression = ts.getClassExtendsHeritageClauseElement(declaration);

        return typeExpression ? checker.getTypeAtLocation(typeExpression) : null;
    }

};
