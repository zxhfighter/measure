import {task, src, dest} from 'gulp';
import {Dgeni} from 'dgeni';
import {sequenceTask} from '../utils/sequence-task';

const markdown = require('gulp-markdown');
const highlight = require('gulp-highlight-files');
const transform = require('gulp-transform');
const hljs = require('highlight.js');
const dom = require('gulp-dom');

const apiDocsPackage = require('../../../docs/config');

// HTML tags in the markdown generated files that should receive a .docs-markdown-${tagName} class
// for styling purposes.
const MARKDOWN_TAGS_TO_CLASS_ALIAS = [
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'li',
    'ol',
    'p',
    'table',
    'tbody',
    'td',
    'th',
    'tr',
    'ul',
    'pre',
    'code',
];

task('api-docs', () => {
    const docs = new Dgeni([apiDocsPackage]);
    return docs.generate();
});

task('md-docs', () => {
    return src(['guides/*.md'])
        .pipe(markdown({
            highlight: (code: string, language: string): string => {
                if (language) {
                    // highlight.js expects "typescript" written out, while Github supports "ts".
                    let lang = language.toLowerCase() === 'ts' ? 'typescript' : language;
                    return hljs.highlight(lang, code).value;
                }

                return code;
            }
        }))
        .pipe(dom(createTagNameAliaser('docs-markdown')))
        .pipe(dest('docs/dist/guides'));
});

task('docs', sequenceTask(
    'api-docs',
    'md-docs'
));

/**
 * Returns a function to be called with an HTML document as its context that aliases HTML tags by
 * adding a class consisting of a prefix + the tag name.
 * @param classPrefix The prefix to use for the alias class.
 */
function createTagNameAliaser(classPrefix: string) {
    return function () {
        MARKDOWN_TAGS_TO_CLASS_ALIAS.forEach(tag => {
            for (let el of this.querySelectorAll(tag)) {
                el.classList.add(`${classPrefix}-${tag}`);
            }
        });

        return this;
    };
}
