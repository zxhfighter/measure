import { Input, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-chips-basic',
    templateUrl: './chips-basic.html',
    styleUrls: ['./chips-basic.less'],
    encapsulation: ViewEncapsulation.None
})
export class DemoChipsBasic {
    chipsValue: Array<any> = ['hello'];
    changeValue(v) {
    	console.log(v);
    }
}
