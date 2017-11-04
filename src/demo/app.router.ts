/**
 * @file 路由配置
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

import {Routes} from '@angular/router';
import {DemoButton} from './button';
import {DemoBreadcrumb} from './breadcrumb';
import {DemoSwitch} from './switch';
import {DemoButtonGroup} from './button-group';
import {DemoBoxGroup} from './box-group';
import {DemoChart} from './chart';
import {DemoProgressBar} from './progress-bar';

export const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'button'},
    {path: 'button', component: DemoButton},
    {path: 'breadcrumb', component: DemoBreadcrumb},
    {path: 'switch', component: DemoSwitch},
    {path: 'button-group', component: DemoButtonGroup},
    {path: 'box-group', component: DemoBoxGroup},
    {path: 'chart', component: DemoChart},
    {path: 'progress-bar', component: DemoProgressBar}
];
