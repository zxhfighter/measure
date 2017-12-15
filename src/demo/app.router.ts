/**
 * @file 路由配置
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

import { Routes } from '@angular/router';
import { ButtonDemo } from './button';
import { BreadcrumbDemo } from './breadcrumb';
import { SwitchDemo } from './switch';
import { ButtonGroupDemo } from './button-group';
import { BoxGroupDemo } from './box-group';
import { ChartDemo } from './chart';
import { ProgressBarDemo } from './progress-bar';
import { SpinnerDemo } from './spinner';
import { CarouselDemo } from './carousel';
import { DemoInput } from './input';
import { DemoTabs } from './tabs';
import { StepDemo } from './step';
import { TableDemo } from './table';
import { DemoTooltip } from './tooltip';
import { DemoPage } from './page';
import { DemoSchedule } from './schedule';
import { DemoTextarea } from './textarea';
import { DemoTextLine } from './text-line';
import { DemoSearchBox } from './search-box';
import { CalendarDemo } from './calendar';
import { ToastDemo } from './toast';
import { SelectDemo } from './select';
import { RegionDemo } from './region';
import { DemoDialog } from './dialog';
import { ChipsDemo } from './chips';
import { CodeHighlighterDemo } from './code-highlighter';
import { CodeBoxDemo } from './code-box';
import { DemoTree } from './tree';
import { DemoSideBar } from './side-bar/';
import { CardDemo } from './card';
import { DemoAccordion } from './accordion';
import { DemoUploader } from './uploader';
import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { TypographyDemo } from './typography';
import { SliderComponentDemo } from './slider';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'button' },
    { path: 'button', component: ButtonDemo },
    { path: 'breadcrumb', component: BreadcrumbDemo },
    { path: 'switch', component: SwitchDemo },
    { path: 'button-group', component: ButtonGroupDemo },
    { path: 'box-group', component: BoxGroupDemo },
    { path: 'chart', component: ChartDemo },
    { path: 'progress-bar', component: ProgressBarDemo },
    { path: 'spinner', component: SpinnerDemo },
    { path: 'carousel', component: CarouselDemo },
    { path: 'input', component: DemoInput },
    { path: 'tabs', component: DemoTabs },
    { path: 'step', component: StepDemo },
    { path: 'tooltip', component: DemoTooltip },
    { path: 'textarea', component: DemoTextarea },
    { path: 'table', component: TableDemo },
    { path: 'tabs', component: DemoTabs },
    { path: 'tooltip', component: DemoTooltip },
    { path: 'page', component: DemoPage },
    { path: 'schedule', component: DemoSchedule },
    { path: 'text-line', component: DemoTextLine },
    { path: 'search-box', component: DemoSearchBox },
    { path: 'calendar', component: CalendarDemo },
    { path: 'toast', component: ToastDemo },
    { path: 'select', component: SelectDemo },
    { path: 'calendar', component: CalendarDemo },
    { path: 'region', component: RegionDemo },
    { path: 'dialog', component: DemoDialog },
    { path: 'tree', component: DemoTree },
    { path: 'side-bar', component: DemoSideBar },
    { path: 'chips', component: ChipsDemo },
    { path: 'code-highlighter', component: CodeHighlighterDemo },
    { path: 'code-box', component: CodeBoxDemo },
    { path: 'tree', component: DemoTree },
    { path: 'card', component: CardDemo },
    { path: 'accordion', component: DemoAccordion },
    { path: 'uploader', component: DemoUploader },
    { path: 'docs', component: GuideComponentDemo },
    { path: 'icons', component: IconsComponentDemo },
    { path: 'typography', component: TypographyDemo },
    { path: 'slider', component: SliderComponentDemo }
];
