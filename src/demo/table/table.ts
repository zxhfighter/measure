import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-table',
    templateUrl: './table.html',
    styleUrls: ['./table.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDemo {

    // basic source
    tsCodeBasic: string = require('!!raw-loader!./basic/table-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/table-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/table-basic.less');

    // basic source
    tsCodeCheckbox: string = require('!!raw-loader!./checkbox/table-checkbox.ts');
    htmlCodeCheckbox: string = require('!!raw-loader!./checkbox/table-checkbox.html');
    lessCodeCheckbox: string = require('!!raw-loader!./checkbox/table-checkbox.less');

    // basic source
    tsCodeSort: string = require('!!raw-loader!./sortable/table-sort.ts');
    htmlCodeSort: string = require('!!raw-loader!./sortable/table-sort.html');
    lessCodeSort: string = require('!!raw-loader!./sortable/table-sort.less');

    // basic source
    tsCodeResize: string = require('!!raw-loader!./resize/table-resize.ts');
    htmlCodeResize: string = require('!!raw-loader!./resize/table-resize.html');
    lessCodeResize: string = require('!!raw-loader!./resize/table-resize.less');

    // basic source
    tsCodeFixHead: string = require('!!raw-loader!./fix-head/table-fix-head.ts');
    htmlCodeFixHead: string = require('!!raw-loader!./fix-head/table-fix-head.html');
    lessCodeFixHead: string = require('!!raw-loader!./fix-head/table-fix-head.less');

    // basic source
    tsCodeFixCol: string = require('!!raw-loader!./fix-column/fix-column.ts');
    htmlCodeFixCol: string = require('!!raw-loader!./fix-column/fix-column.html');
    lessCodeFixCol: string = require('!!raw-loader!./fix-column/fix-column.less');

    // basic source
    tsCodeSpan: string = require('!!raw-loader!./colspan/table-colspan.ts');
    htmlCodeSpan: string = require('!!raw-loader!./colspan/table-colspan.html');
    lessCodeSpan: string = require('!!raw-loader!./colspan/table-colspan.less');

    // basic source
    tsCodeEdit: string = require('!!raw-loader!./edit/table-edit.ts');
    htmlCodeEdit: string = require('!!raw-loader!./edit/table-edit.html');
    lessCodeEdit: string = require('!!raw-loader!./edit/table-edit.less');
}
