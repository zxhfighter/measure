import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[nbFormItem]'
})

export class NbFormItemDirective {
    _withHelp = 0;

    @HostBinding(`class.nb-form-item`) _nzFormItem = true;

    enableHelp() {
        this._withHelp++;
    };

    disableHelp() {
        this._withHelp--;
    };

    @HostBinding(`class.nb-form-item-with-help`)
    get withHelp(): boolean {
        return this._withHelp > 0;
    };

    constructor() {
    }
}
