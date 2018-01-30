import { Component } from '@angular/core';

@Component({
    selector: 'demo-text-line-basic',
    templateUrl: './text-line-basic.html',
    styleUrls: ['./text-line-basic.less']
})

export class TextLineBasicDemo {
    disabled = false;
    value = 'fadsfaf';
    placeholder = "自定义placeholder";
}
