import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectConfig } from '../../../component/select/select.config';

export class GroupBoxItem {
    name: string;
    value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

@Component({
    selector: 'demo-form-horizontal',
    templateUrl: './form-horizontal.html',
    styleUrls: ['./form-horizontal.less']
})
export class FormHorizontalDemo implements OnInit {
    validateForm: FormGroup;

    chargeOpts: GroupBoxItem[] = [
        new GroupBoxItem('CPM', 1),
        new GroupBoxItem('CPT', 2)
    ];

    creativeOpts: GroupBoxItem[] = [
        new GroupBoxItem('图片创意', 1),
        new GroupBoxItem('视频创意', 2),
        new GroupBoxItem('图文创意', 3)
    ];

    genderOpts: GroupBoxItem[] = [
        new GroupBoxItem('男', 1),
        new GroupBoxItem('女', 2)
    ];


    orderData: SelectConfig[] = [
        {
            label: '订单3801273',
            value: 3801273
        },
        {
            label: '订单1217022',
            value: 1217022
        },
        {
            label: '订单2902826',
            value: 2902826
        },
        {
            label: '订单9271872',
            value: 9271872
        }
    ];

    defaultChargeType = [1];
    defaultGender = [2];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            planName: new FormControl(null, [Validators.required]),
            keyword: new FormControl(null, [Validators.required]),
            creativeType: new FormControl(null, [Validators.required]),
            price: new FormControl(null, [Validators.min(0)]),
            chargeType: new FormControl(this.defaultChargeType, [Validators.required]),
            gender: new FormControl(this.defaultGender, [Validators.required]),
            autoOffline: new FormControl(null, [Validators.required]),
            orderId: new FormControl(null, [Validators.required]),
            remark: new FormControl(null, [Validators.required])
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    submitForm() {
        console.log('submit');
    }
}
