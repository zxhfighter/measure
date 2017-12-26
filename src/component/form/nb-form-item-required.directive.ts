import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[nbFormItemRequired]'
})

export class NbFormItemRequiredDirective {
    @Input() @HostBinding(`class.nb-form-item-required`) nzRequired = true;
}
