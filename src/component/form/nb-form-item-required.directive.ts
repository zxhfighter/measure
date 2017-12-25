import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[nb-form-item-required]'
})

export class NbFormItemRequiredDirective {
    @Input() @HostBinding(`class.nb-form-item-required`) nzRequired = true;
}
