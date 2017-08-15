import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo.component';
import {ButtonDemo} from './button/button.demo';
import {ButtongroupDemo} from './buttongroup/buttongroup.demo';
import {CheckboxDemo} from './checkbox/checkbox.demo';
import {BoxGroupDemo} from './boxgroup/boxgroup.demo';

const routes: Routes = [
    {
        path: 'demo',  
        component: DemoComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'button'},
            {path: 'button', component: ButtonDemo},
            {path: 'buttongroup', component: ButtongroupDemo},
            {path: 'checkbox', component: CheckboxDemo},
            {path: 'boxgroup', component: BoxGroupDemo},
        ]
    }
];

const demoRouterModule = RouterModule.forChild(routes);
export {demoRouterModule};
