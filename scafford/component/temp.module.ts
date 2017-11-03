import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {<%= upperName %>Component} from './<%= name %>';

@NgModule({
    imports: [CommonModule],
    declarations: [<%= upperName %>Component],
    exports: [<%= upperName %>Component]
})
export class <%= upperName %>Module {}
