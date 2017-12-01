import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'demo-box-group',
    templateUrl: './box-group.html',
    styleUrls: ['./box-group.less'],
    preserveWhitespaces: false
})
export class DemoBoxGroup implements OnInit {

    singleDisabled = false;

    form: FormGroup;

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./checkbox/checkbox.ts');
    htmlCodeBasic: string = require('!!raw-loader!./checkbox/checkbox.html');
    lessCodeBasic: string = require('!!raw-loader!./checkbox/checkbox.less');

    // radio source
    tsCodeRadio: string = require('!!raw-loader!./radio/radio.ts');
    htmlCodeRadio: string = require('!!raw-loader!./radio/radio.html');
    lessCodeRadio: string = require('!!raw-loader!./radio/radio.less');

    // checkbox group source
    tsCodeCheckboxGroup: string = require('!!raw-loader!./checkbox-group/checkbox-group.ts');
    htmlCodeCheckboxGroup: string = require('!!raw-loader!./checkbox-group/checkbox-group.html');
    lessCodeCheckboxGroup: string = require('!!raw-loader!./checkbox-group/checkbox-group.less');

    // radio group source
    tsCodeRadioGroup: string = require('!!raw-loader!./radio-group/radio-group.ts');
    htmlCodeRadioGroup: string = require('!!raw-loader!./radio-group/radio-group.html');
    lessCodeRadioGroup: string = require('!!raw-loader!./radio-group/radio-group.less');

    // radio group source
    tsCodeForm: string = require('!!raw-loader!./form/box-group-form.ts');
    htmlCodeForm: string = require('!!raw-loader!./form/box-group-form.html');
    lessCodeForm: string = require('!!raw-loader!./form/box-group-form.less');

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.fb.group({
            radioBox: [
                {value: ['x'], disabled: false}
            ],
            checkboxBox: [
                {value: ['b', 's'], disabled: true}
            ]
        });
    }

    onSingleCheck(checked: boolean) {
        alert(`checked: ${checked}`);
    }

    onCheckboxGroupChange(event: any) {
        console.log(event);
    }

    onRadioGroupChange(event: any) {
        console.log(event);
    }

    changeSingleDisabled() {
        this.singleDisabled = !this.singleDisabled;
    }
}
