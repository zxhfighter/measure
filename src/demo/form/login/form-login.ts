import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

@Component({
    selector: 'demo-form-login',
    templateUrl: './form-login.html',
    styleUrls: ['./form-login.less']
})
export class FormLoginDemo implements OnInit{
    validateForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            remember: [ true ],
        });
    }
}
