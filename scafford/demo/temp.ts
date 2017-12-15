import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-<%= name %>',
    templateUrl: './<%= name %>.html',
    styleUrls: ['./<%= name %>.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class <%= upperName %>Demo implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
