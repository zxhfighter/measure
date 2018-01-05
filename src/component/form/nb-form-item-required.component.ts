import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: '[nb-form-required]',
    template: `
        <ng-content></ng-content>
    `
})

export class NbFormItemRequiredComponent {
    @Input() @HostBinding(`class.nb-form-item-required`) nbRequired = true;
}
