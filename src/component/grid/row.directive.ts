import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

export type NbJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
export type NbAlign = 'top' | 'middle' | 'bottom';
export type NbType = 'flex' | null;

@Directive({
    selector: '[nbRow]'
})

export class NbRowDirective implements OnInit {
    _classList: Array<string> = [];
    _el: HTMLElement;
    _prefixCls = 'nb-row';
    _gutter: number;
    _type: NbType;
    _align: NbAlign = 'top';
    _justify: NbJustify = 'start';

    @Input()
    set nbType(value: NbType) {
        this._type = value;
        this.setClassMap();
    }

    get nbType(): NbType {
        return this._type;
    }

    @Input()
    set nbAlign(value: NbAlign) {
        this._align = value;
        this.setClassMap();
    }

    get nbAlign(): NbAlign {
        return this._align;
    }

    @Input()
    set nbJustify(value: NbJustify) {
        this._justify = value;
        this.setClassMap();
    }

    get nbJustify(): NbJustify {
        return this._justify;
    }

    @Input()
    get nbGutter(): number {
        return this._gutter;
    }

    set nbGutter(value: number) {
        this._gutter = value;
        this.setStyle();
    }

    setStyle() {
        this._renderer.setStyle(this._el, 'margin-left', `-${this._gutter / 2}px`);
        this._renderer.setStyle(this._el, 'margin-right', `-${this._gutter / 2}px`);
    }

    setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this._el, _className);
        });
        this._classList = [
            (!this.nbType) && this._prefixCls,
            this.nbType && `${this._prefixCls}-${this.nbType}`,
            this.nbType && this.nbAlign && `${this._prefixCls}-${this.nbType}-${this.nbAlign}`,
            this.nbType && this.nbJustify && `${this._prefixCls}-${this.nbType}-${this.nbJustify}`
        ].filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._el, _className);
        });
    }

    constructor(private _elementRef: ElementRef,
                private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit() {
        this.setClassMap();
    }
}
