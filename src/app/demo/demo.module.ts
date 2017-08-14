import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {demoRouterModule} from './demo.router';
import {DemoComponent} from './demo.component';
import {ButtonDemo} from './button/button.demo';
import {ButtongroupDemo} from './buttongroup/buttongroup.demo';

import {UICodeHighLightModule} from '../component/codehighlight';
import {UIButtonModule} from '../component/button';
import {UIButtonGroupModule} from '../component/buttongroup';

@NgModule({
    imports: [
        CommonModule,
        demoRouterModule,
        UICodeHighLightModule,
        UIButtonModule,
        UIButtonGroupModule,
        FormsModule
    ],
    declarations: [
        DemoComponent,
        ButtonDemo,
        ButtongroupDemo
    ],
    providers: [],
    exports: []
})
export class DemoModule {}
