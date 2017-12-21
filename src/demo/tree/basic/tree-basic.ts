import {
    Component
} from '@angular/core';

import {
    treeData,
    treeDataSelected
} from '../tree-data';

@Component({
    selector: 'demo-tree-basic',
    templateUrl: './tree-basic.html',
    styleUrls: ['./tree-basic.less'],
    preserveWhitespaces: false
})

export class TreeBasicDemo {

    treeData = treeData;

    treeDataSelected = treeDataSelected;

    disabled = true;

    nodeSelect(event) {
        console.log(event);
    }
}
