import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { BoxGroupValue, BoxGroupItem } from '../../../component/box-group';

@Component({
    selector: 'demo-boxgroup-dynamic',
    templateUrl: './box-group-dynamic.html',
    styleUrls: ['./box-group-dynamic.less'],
    encapsulation: ViewEncapsulation.None
})
export class BoxGroupDynamicDemo implements OnInit {

    form: FormGroup;

    datasource: BoxGroupItem[] = [
        {value: '1', text: 'apple', checked: false, disabled: false},
        {value: '2', text: 'banana', checked: false, disabled: false},
        {value: '3', text: 'lemon', checked: false, disabled: false},
        {value: '4', text: 'orange', checked: false, disabled: false}
    ];

    datasource2 = [

        {value: '1', text: 'apple', checked: false, disabled: false},
        {value: '2', text: 'banana', checked: false, disabled: false},
        {value: '3', text: 'lemon', checked: false, disabled: false},
        {value: '4', text: 'orange', checked: false, disabled: false}
    ];

    data2: any = [];

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            radioBox1: [
                { value: ['3'], disabled: false }
            ],
            checkboxBox1: [
                { value: ['1', '4'], disabled: false }
            ]
        });

        setTimeout(() => {
            this.data2 = ['3'];
        }, 2000);
    }
}
