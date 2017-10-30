import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'demo-box-group',
    templateUrl: './box-group.html',
    styleUrls: ['./box-group.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoBoxGroup implements OnInit {

    form: FormGroup;

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
}
