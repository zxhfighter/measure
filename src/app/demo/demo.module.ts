import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {demoRouterModule} from './demo.router';
import {DemoComponent} from './demo.component';
import {ButtonDemo} from './button/button.demo';
import {ButtongroupDemo} from './buttongroup/buttongroup.demo';
import {CheckboxDemo} from './checkbox/checkbox.demo';
import {BoxGroupDemo} from './boxgroup/boxgroup.demo';
import {DocsComponent} from './docs/docs.component';

import {UICodeHighLightModule} from '../component/codehighlight';
import {UIButtonModule} from '../component/button';
import {UIButtonGroupModule} from '../component/buttongroup';
import {UICheckboxModule} from '../component/checkbox';
import {UIBoxGroupModule} from '../component/boxgroup';

@NgModule({
    imports: [
        CommonModule,
        demoRouterModule,
        UICodeHighLightModule,
        UIButtonModule,
        UIButtonGroupModule,
        UICheckboxModule,
        UIBoxGroupModule,
        FormsModule
    ],
    declarations: [
        DemoComponent,
        ButtonDemo,
        ButtongroupDemo,
        CheckboxDemo,
        BoxGroupDemo,
        DocsComponent
    ],
    providers: [],
    exports: []
})
export class DemoModule {}
