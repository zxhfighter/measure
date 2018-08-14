/**
 * @file no "// todo" or "// TODO"
 */

import * as ts from 'typescript';
import * as Lint from 'tslint';
import * as utils from 'tsutils';

const ERROR_MESSAGE = 'TODO 语句出现在了块级注释中，可能会被生成在对应的 API 描述中。';

export class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile: ts.SourceFile) {
        return this.applyWithWalker(new NoTodoWalker(sourceFile, this.getOptions()));
    }
}

class NoTodoWalker extends Lint.RuleWalker {

    visitSourceFile(sourceFile: ts.SourceFile) {

        utils.forEachComment(sourceFile, (text, commentRange) => {
            const isTodoComment = text
                .substring(commentRange.pos, commentRange.end)
                .toUpperCase().includes('TODO:');

            // 块级注释不应该出现 TODO，因为块级注释会被生成相应的 API 文档
            if (commentRange.kind === ts.SyntaxKind.MultiLineCommentTrivia && isTodoComment) {
                this.addFailureAt(commentRange.pos, commentRange.end - commentRange.pos, ERROR_MESSAGE);
            }
        });

        super.visitSourceFile(sourceFile);
    }
}
