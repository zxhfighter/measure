import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-<%= name %>',
    templateUrl: './<%= name %>.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-<%= name %>'
    },
    exportAs: 'nb<%= upperName %>'
})
export class <%= upperName %>Component implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
