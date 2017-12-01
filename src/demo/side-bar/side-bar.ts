import {
    Component, 
    OnInit, 
    ChangeDetectionStrategy
} from '@angular/core';
import {dataSideBar} from './side-bar-test-data';

@Component({
    selector: 'demo-side-bar',
    templateUrl: './side-bar.html',
    styleUrls: ['./side-bar.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSideBar implements OnInit {

    private data = dataSideBar;

    constructor() {

    }

    ngOnInit() {

    }
}
