import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: '[nb-form-control]',
    template: `
        <div class="nb-form-item-control"
             [class.has-error]="isError"
             [class.has-success]="isSuccess"
             [class.has-feedback]="hasFeedBack">
            <ng-content></ng-content>
        </div>
    `
})

export class NbFormControlComponent {
    _hasFeedback = false;
    @HostBinding(`class.nb-form-item-control-wrapper`) _nbFormItemControlWrapper = true;

    @Input()
    set nbHasFeedback(value: boolean | string) {
        this._hasFeedback = value === '' ;
    }

    get nbHasFeedback() {
        return this._hasFeedback as boolean;
    }

    @Input() nbValidateStatus;

    get isError(): boolean {
        return this._isDirtyAndError('error')
            || this._isDirtyAndError('required')
            || this._isDirtyAndError('pattern')
            || this._isDirtyAndError('email')
            || this._isDirtyAndError('maxlength')
            || this._isDirtyAndError('minlength')
            || this._isDirtyAndError('min')
            || this._isDirtyAndError('max');
    }

    get isSuccess(): boolean {
        return this.nbValidateStatus === 'success' || this.nbValidateStatus &&
            this.nbValidateStatus.dirty && this.nbValidateStatus.valid;
    }

    get hasFeedBack(): boolean {
        return this.nbHasFeedback as boolean;
    }

    _isDirtyAndError(name) {
        return this.nbValidateStatus === name || this.nbValidateStatus &&
            this.nbValidateStatus.dirty && this.nbValidateStatus.hasError && this.nbValidateStatus.hasError(name);
    }

    constructor() {
    }
}
