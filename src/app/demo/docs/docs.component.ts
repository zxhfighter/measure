import {
    Component, Input, Output, EventEmitter, AfterViewInit,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-docs',
    templateUrl: './docs.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DocsComponent implements OnInit, AfterViewInit {
    name = 'ComponentName';

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        
    }
}
