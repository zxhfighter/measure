import { Component } from '@angular/core';

@Component({
    selector: 'demo-<%= name %>-basic',
    templateUrl: './<%= name %>-basic.html',
    styleUrls: ['./<%= name %>-basic.less']
})
export class <%= upperName %>BasicDemo { }
