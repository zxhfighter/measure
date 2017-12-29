import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-form-inline',
    templateUrl: './form-inline.html',
    styleUrls: ['./form-inline.less']
})
export class FormInlineDemo implements OnInit {
    validateForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ]
        });
    }
}
