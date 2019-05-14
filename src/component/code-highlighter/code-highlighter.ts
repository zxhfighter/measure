import {
    Component, Input, ElementRef, ViewChild, AfterViewInit,
    ViewEncapsulation, ChangeDetectionStrategy, Renderer2, OnChanges, SimpleChanges
} from '@angular/core';

import * as prismLib from 'prismjs';
import { OnChange } from '../core/decorators';

const prism: any = (prismLib as any).default ? (prismLib as any).default : prismLib;

/**
 * Code Highlighter Component
 */
@Component({
    selector: 'nb-code-highlighter',
    templateUrl: './code-highlighter.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: true,
    host: {
        'class': 'nb-widget nb-code-highlighter'
    },
    exportAs: 'nbCodeHighlighter'
})
export class CodeHighlighterComponent implements AfterViewInit, OnChanges {

    /**
     * code language, see http://prismjs.com/index.html#languages-list
     * @default typescript
     */
    @Input() language: string = 'typescript';

    /**
     * whether show line numbers, default to false
     */
    @OnChange(true)
    @Input() linenumbers: boolean = false;

    /**
     * code style theme, todo
     * @docs-private
     */
    @Input() theme: string = '';

    /**
     * code line range highlight, todo
     * @docs-private
     */
    @Input() linehighlight: number;

    /**
     * raw code to be highlighted
     * @default ''
     */
    @Input() rawCode: string = '';

    /** code element */
    @ViewChild('code') _code: ElementRef;

    /** ng-content wrapper element */
    @ViewChild('content') _content: ElementRef;

    constructor(private el: ElementRef, private render: Renderer2) { }

    ngAfterViewInit() {
        this.highlight();
    }



    /**
     * @docs-private
     */
    highlight() {
        try {
            if (this.language) {

                // add hooks, see https://github.com/PrismJS/prism/issues/832
                prism.hooks.add('before-highlight', function (env) {
                    env.code = env.element.innerText;
                });

                const codeEl = this._code.nativeElement as HTMLElement;
                const contentEl = this._content.nativeElement as HTMLElement;

                // get custom `<ng-content>` content
                const contentText = contentEl.innerText.trim();

                // highlight code element
                const htmlCode = prism.highlight(this.rawCode || contentText, prism.languages[this.language]);

                // if no rawCode, highlight custom content text
                this.render.setProperty(codeEl, 'innerHTML', htmlCode);

                // prism.highlightElement(codeEl, true, () => {
                //     console.log('highlight-done');
                // });

                // remove extra ng-content child from dom
                // this.render.removeChild(contentEl.parentNode, contentEl);
            }
        }
        catch (e) {
            throw new Error('cannot highlight code, see error: ' + e);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('rawCode' in changes) {
            this.highlight();
        }
    }
}
