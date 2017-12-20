import {
    Component, 
    ChangeDetectionStrategy
} from '@angular/core';

import {dataSideBar} from '../side-bar-test-data';

@Component({
    selector: 'demo-side-bar-basic',
    templateUrl: './side-bar-basic.html',
    styleUrls: ['./side-bar-basic.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})

export class SideBarBasicDemo {

    private data = dataSideBar;

    onNavi(event) {
        console.log(event);
    }
}
