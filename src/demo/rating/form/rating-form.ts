import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'demo-rating-form',
    templateUrl: './rating-form.html',
    styleUrls: ['./rating-form.less']
})
export class RatingFormDemo implements OnInit {
    ratingValue = 4;

    myForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.myForm = this.fb.group({
            star: [
                {value: 4, disabled: false}
            ]
        });
    }
}
