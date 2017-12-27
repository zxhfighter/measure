import { Component, HostBinding } from '@angular/core';

@Component({
    selector: '[nb-form-label]',
    template: `
        <ng-content></ng-content>
    `
})

export class NbFormLabelComponent {
    @HostBinding(`class.nb-form-item-label`) _nzFormItemLabel = true;
}
