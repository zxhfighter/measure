import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoComponent} from './demo.component';
import {ButtonDemo} from './button/button.demo';
import {ButtongroupDemo} from './buttongroup/buttongroup.demo';
import {CheckboxDemo} from './checkbox/checkbox.demo';
import {BoxGroupDemo} from './boxgroup/boxgroup.demo';
import {DocsComponent} from './docs/docs.component';

const routes: Routes = [
    {
        path: 'demo',  
        component: DemoComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'components/button'},
            {path: 'components', redirectTo: 'components/button'},
            {path: 'components/button', component: ButtonDemo},
            {path: 'components/buttongroup', component: ButtongroupDemo},
            {path: 'components/checkbox', component: CheckboxDemo},
            {path: 'components/boxgroup', component: BoxGroupDemo},
            {path: 'docs', component: DocsComponent}
        ]
    }
];

const demoRouterModule = RouterModule.forChild(routes);
export {demoRouterModule};
