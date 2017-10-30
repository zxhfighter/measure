/**
 * @file 路由配置
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

import {Routes} from '@angular/router';
import {DemoButton} from './button';
import {DemoBreadcrumb} from './breadcrumb';
import {DemoSwitch} from './switch';

export const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'button'},
    {path: 'button', component: DemoButton},
    {path: 'breadcrumb', component: DemoBreadcrumb},
    {path: 'switch', component: DemoSwitch}
];
