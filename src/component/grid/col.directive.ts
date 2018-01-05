import {
    Component,
    Directive,
    Input,
    OnInit,
    ElementRef,
    HostBinding,
    OnChanges,
    Renderer2,
    SimpleChange,
    Host,
    Optional
} from '@angular/core';
import {NbRowDirective} from './row.directive';

export abstract class EmbeddedProperty {
    span: number;
    pull: number;
    push: number;
    offset: number;
    order: number;
}

@Directive({
    selector: '[nb-col]'
})

export class NbColDirective implements OnInit, OnChanges {
    _classList: Array<string> = [];
    _el: HTMLElement;
    _prefixCls = 'nb-col';

    @HostBinding('style.padding-left.px')
    get paddingLeft() {
        return this._nbRow && this._nbRow._gutter / 2;
    }

    @HostBinding('style.padding-right.px')
    get paddingRight() {
        return this._nbRow && this._nbRow._gutter / 2;
    }

    @Input() nbSpan: number;
    @Input() nbOrder: number;
    @Input() nbOffset: number;
    @Input() nbPush: number;
    @Input() nbPull: number;
    @Input() nbXs: number | EmbeddedProperty;
    @Input() nbSm: number | EmbeddedProperty;
    @Input() nbMd: number | EmbeddedProperty;
    @Input() nbLg: number | EmbeddedProperty;
    @Input() nbXl: number | EmbeddedProperty;

    /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
    setClassMap(): void {
        this._classList.forEach(_className => {
            this._renderer.removeClass(this._el, _className);
        });
        this._classList = [
            this.nbSpan && `${this._prefixCls}-${this.nbSpan}`,
            this.nbOrder && `${this._prefixCls}-order-${this.nbOrder}`,
            this.nbOffset && `${this._prefixCls}-offset-${this.nbOffset}`,
            this.nbPull && `${this._prefixCls}-pull-${this.nbPull}`,
            this.nbPush && `${this._prefixCls}-push-${this.nbPush}`,
            ...this.generateClass()
        ];
        this._classList = this._classList.filter((item) => {
            return !!item;
        });
        this._classList.forEach(_className => {
            this._renderer.addClass(this._el, _className);
        })
    }

    generateClass() {
        const listOfSizeInputName = ['nbXs', 'nbSm', 'nbMd', 'nbLg', 'nbXl'];
        const listOfClassName = [];
        listOfSizeInputName.forEach(name => {
            const sizeName = name.replace('nb', '').toLowerCase();
            if ((typeof(this[name]) === 'number') || (typeof (this[name]) === 'string')) {
                listOfClassName.push(this[name] && `${this._prefixCls}-${sizeName}-${this[name]}`);
            } else {
                listOfClassName.push(this[name] && this[name]['span'] && `${this._prefixCls}-${sizeName}-${this[name]['span']}`);
                listOfClassName.push(this[name] && this[name]['pull'] && `${this._prefixCls}-${sizeName}-pull-${this[name]['pull']}`);
                listOfClassName.push(this[name] && this[name]['push'] && `${this._prefixCls}-${sizeName}-push-${this[name]['push']}`);
                listOfClassName.push(this[name] && this[name]['offset'] && `${this._prefixCls}-${sizeName}-offset-${this[name]['offset']}`);
                listOfClassName.push(this[name] && this[name]['order'] && `${this._prefixCls}-${sizeName}-order-${this[name]['order']}`);
            }
        });
        return listOfClassName;
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        this.setClassMap();
    }

    constructor(private _elementRef: ElementRef,
                @Optional() @Host() public _nbRow: NbRowDirective,
                private _renderer: Renderer2) {
        this._el = this._elementRef.nativeElement;
    }

    ngOnInit(): any {
        this.setClassMap();
    }
}
