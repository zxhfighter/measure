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
import {DemoSpinner} from './spinner';
import {DemoCarousel} from './carousel';
import {DemoTabs} from './tabs';
import {DemoStep} from './step';
import {DemoTooltip} from './tooltip';

export const appRoutes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'button'},
    {path: 'button', component: DemoButton},
    {path: 'breadcrumb', component: DemoBreadcrumb},
    {path: 'switch', component: DemoSwitch},
    {path: 'button-group', component: DemoButtonGroup},
    {path: 'box-group', component: DemoBoxGroup},
    {path: 'chart', component: DemoChart},
    {path: 'progress-bar', component: DemoProgressBar},
    {path: 'spinner', component: DemoSpinner},
    {path: 'carousel', component: DemoCarousel},
    {path: 'tabs', component: DemoTabs},
    {path: 'step', component: DemoStep},
    {path: 'tooltip', component: DemoTooltip}
];
