import { Component, HostBinding } from '@angular/core';

@Component({
    selector: '[nb-form-item]',
    template: `
        <ng-content></ng-content>
    `
})

export class NbFormItemComponent {
    _withHelp = 0;

    @HostBinding(`class.nb-form-item`) _nzFormItem = true;

    enableHelp() {
        this._withHelp++;
    }

    disableHelp() {
        this._withHelp--;
    }

    @HostBinding(`class.nb-form-item-with-help`)
    get withHelp(): boolean {
        return this._withHelp > 0;
    }

    constructor() {
    }
}
