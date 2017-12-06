import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import {treeData, treeDataSelected} from './tree-data';

@Component({
    selector: 'demo-tree',
    templateUrl: './tree.html',
    styleUrls: ['./tree.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoTree implements OnInit {

    private treeData = treeData;

    private treeDataSelected  = treeDataSelected;

    constructor() { }

    ngOnInit() {

    }

    nodeSelect(event) {
        console.log(event);
    }
}
