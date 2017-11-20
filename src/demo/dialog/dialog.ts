import {
    Component, OnInit, ChangeDetectionStrategy, ViewChild
} from '@angular/core';
import { DialogComponent } from '../../component/dialog/dialog';

@Component({
    selector: 'demo-dialog',
    templateUrl: './dialog.html',
    styleUrls: ['./dialog.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoDialog implements OnInit {

    @ViewChild(DialogComponent) dialog: DialogComponent;

    constructor() {

    }

    ngOnInit() {

    }

    openDialog() {
        this.dialog.show();
    }
}
