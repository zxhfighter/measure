import { Component } from '@angular/core';

@Component({
    selector: 'demo-grid-gutter',
    templateUrl: './grid-gutter.html',
    styleUrls: ['./grid-gutter.less'],
    host: {
        'class': 'code-box-demo'
    }
})
export class GridGutterDemo {
    gutterValue: number = 8;
}
