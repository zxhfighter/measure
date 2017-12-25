import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[nbFormLabel]'
})

export class NbFormLabelDirective {
    @HostBinding(`class.nb-form-item-label`) _nzFormItemLabel = true;
}
