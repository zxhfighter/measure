import { Component } from '@angular/core';

@Component({
    selector: 'demo-<%= name %>',
    templateUrl: './<%= name %>.html',
    styleUrls: ['./<%= name %>.less']
})
export class <%= upperName %>Demo {

    tsCodeBasic: string = require('!!raw-loader!./basic/<%= name %>-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/<%= name %>-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/<%= name %>-basic.less');
}
