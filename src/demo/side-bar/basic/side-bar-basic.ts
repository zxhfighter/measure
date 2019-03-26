import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    sigleDataSideBar,
    sigleDataSideBarEnglish,
    dataSideBar,
    changeDataSideBar
} from '../side-bar-test-data';

@Component({
    selector: 'demo-side-bar-basic',
    templateUrl: './side-bar-basic.html',
    styleUrls: ['./side-bar-basic.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})

export class SideBarBasicDemo {

    sigleData = sigleDataSideBar;

    sigleDataEnglish = sigleDataSideBarEnglish;

    data = dataSideBar;

    selectedNodeId = '010102';

    onNavi(event) {
        console.log(event);
    }

    changeData() {
        this.sigleData = changeDataSideBar;
    }
}
