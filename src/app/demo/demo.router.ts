import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo.component';
import {ButtonDemo} from './button/button.demo';
import {ButtongroupDemo} from './buttongroup/buttongroup.demo';

const routes: Routes = [
    {
        path: 'demo',  
        component: DemoComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'button'},
            {path: 'button', component: ButtonDemo},
            {path: 'buttongroup', component: ButtongroupDemo}
        ]
    }
];

const demoRouterModule = RouterModule.forChild(routes);
export {demoRouterModule};
