import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'x-<%= name %>',
    templateUrl: './<%= name %>.html',
    styleUrls: ['./<%= name %>.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-<%= name %>'
    }
})
export class <%= upperName %>Component implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
