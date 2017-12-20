import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'demo-tooltip-input-focus',
    templateUrl: './tooltip-input-focus.html',
    styleUrls: ['./tooltip-input-focus.less']
})
export class TooltipInputFocusDemo implements OnInit {
    @Input() value: string = '0';

    ngOnInit() {
        // setInterval(function () {
        //     this.value += '1';
        //     console.log(this.value);
        // }, 5000);
    }

    changeTip() {
        this.value += 'wfjheyinw';
    }
}
