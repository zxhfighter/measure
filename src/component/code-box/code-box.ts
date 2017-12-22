import {
    Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

@Component({
    selector: 'nb-code-box',
    templateUrl: './code-box.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: true,
    host: {
        'class': 'nb-widget nb-codebox'
    },
    exportAs: 'nbCodeBox'
})
export class CodeBoxComponent {
    /**
     * ts/js code
     * @default ''
     */
    @Input() tsCode: string = '';

    /**
     * html code
     * @default ''
     */
    @Input() htmlCode: string = '';

    /**
     * less/css code
     * @default ''
     */
    @Input() lessCode: string = '';

    /**
     * whether show source code
     * @docs-private
     */
    showSource: boolean = false;

    /**
     * whether show demo
     * @docs-private
     */
    _showDemo = true;

    /**
     * @docs-private
     */
    onToggleDemo() {
        this._showDemo = !this._showDemo;
    }

    /**
     * @docs-private
     * @param {MouseEvent} event - mouse event
     */
    onToggleViewSource(event: MouseEvent) {
        this.showSource = !this.showSource;
        event.stopPropagation();
    }
}
