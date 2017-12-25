import {
    Component, ElementRef,Renderer2, Input,
    OnInit, ViewEncapsulation
} from '@angular/core';

@Component({
    selector: '[nbForm]',
    template: `
        <div class="nb-widget nb-form">
            <ng-content></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
    exportAs: 'nbForm'
})
export class FormComponent implements OnInit {
    _el: HTMLElement;
    _prefixCls = 'nb-form';

    @Input() nzLayout: 'horizontal' | 'inline' = 'horizontal';

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit() {
        this.setClassMap();
    }

    setClassMap(): void {
        this._renderer.addClass(this._el, `${this._prefixCls}-${this.nzLayout}`);
    }
}
