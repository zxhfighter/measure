import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    treeData,
    treeDataSelected
} from '../tree-data';

@Component({
    selector: 'demo-tree-mode',
    templateUrl: './tree-mode.html',
    styleUrls: ['./tree-mode.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})

export class TreeModeDemo {

    private treeData = treeData;

    private treeDataSelected = treeDataSelected;

    nodeSelect(event) {
        console.log(event);
    }
}
