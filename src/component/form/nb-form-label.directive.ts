import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[nb-form-label]'
})

export class NbFormLabelDirective {
    @HostBinding(`class.nb-form-item-label`) _nzFormItemLabel = true;
}
