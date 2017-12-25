import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NbFormItemDirective } from './nb-form-item.directive';

@Component({
    selector: '[nb-form-explain]',
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-content></ng-content>
    `,
    styles: []
})

export class NbFormExplainComponent implements OnDestroy, OnInit {
    @HostBinding(`class.nb-form-explain`) _nzFormExplain = true;

    constructor(private _nzFormItem: NbFormItemDirective) {
    }

    ngOnDestroy(): any {
        this._nzFormItem.disableHelp();
    }

    ngOnInit() {
        this._nzFormItem.enableHelp();
    }
}
