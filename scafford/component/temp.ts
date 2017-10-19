import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'ui-<%= name %>',
    templateUrl: './<%= name %>.html',
    styleUrls: ['./<%= name %>.less'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class <%= upperName %>Component implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
