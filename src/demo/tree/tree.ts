import {
    Component
} from '@angular/core';

@Component({
    selector: 'demo-tree',
    templateUrl: './tree.html',
    styleUrls: ['./tree.less'],
    preserveWhitespaces: false
})

export class TreeDemo {
    // basic sources
    tsCodeBasic: string = require('!!raw-loader!./basic/tree-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/tree-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/tree-basic.less');

    // mode sources
    tsCodeMode: string = require('!!raw-loader!./mode/tree-mode.ts');
    htmlCodeMode: string = require('!!raw-loader!./mode/tree-mode.html');
    lessCodeMode: string = require('!!raw-loader!./mode/tree-mode.less');
}
