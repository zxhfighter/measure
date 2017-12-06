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
import {DemoInput} from './input';
import {DemoTabs} from './tabs';
import {DemoStep} from './step';
import {DemoTable} from './table';
import {DemoTooltip} from './tooltip';
import {DemoPage} from './page';
import {DemoSchedule} from './schedule';
import {DemoTextarea} from './textarea';
import {DemoTextLine} from './text-line';
import {DemoSearchBox} from './search-box';
import {DemoCalendar} from './calendar';
import {DemoToast} from './toast';
import {DemoSelect} from './select';
import {DemoRegion} from './region';
import {DemoDialog} from './dialog';
import {DemoChips} from './chips';
import {DemoCodeHighlighter} from './code-highlighter';
import {DemoCodeBox} from './code-box';
import {DemoTree} from './tree';
import {DemoSideBar} from './side-bar/';
import {DemoCard} from './card';
import {DemoAccordion} from './accordion';
import {DemoUploader} from './uploader';

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
    {path: 'input', component: DemoInput},
    {path: 'tabs', component: DemoTabs},
    {path: 'step', component: DemoStep},
    {path: 'tooltip', component: DemoTooltip},
    {path: 'textarea', component: DemoTextarea},
    {path: 'table', component: DemoTable},
    {path: 'tabs', component: DemoTabs},
    {path: 'tooltip', component: DemoTooltip},
    {path: 'page', component: DemoPage},
    {path: 'schedule', component: DemoSchedule},
    {path: 'text-line', component: DemoTextLine},
    {path: 'search-box', component: DemoSearchBox},
    {path: 'calendar', component: DemoCalendar},
    {path: 'toast', component: DemoToast},
    {path: 'select', component: DemoSelect},
    {path: 'calendar', component: DemoCalendar},
    {path: 'region', component: DemoRegion},
    {path: 'dialog', component: DemoDialog},
    {path: 'tree', component: DemoTree},
    {path: 'side-bar', component: DemoSideBar},
    {path: 'chips', component: DemoChips},
    {path: 'code-highlighter', component: DemoCodeHighlighter},
    {path: 'code-box', component: DemoCodeBox},
    {path: 'tree', component: DemoTree},
    {path: 'card', component: DemoCard},
    {path: 'accordion', component: DemoAccordion},
    {path: 'uploader', component: DemoUploader}
];
