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
import { TabsDemo } from './tabs';
import { InputDemo } from './input';
import { StepDemo } from './step';
import { TableDemo } from './table';
import { TooltipDemo } from './tooltip';
import { DemoPage } from './page';
import { DemoSchedule } from './schedule';
import { TextareaDemo } from './textarea';
import { TextLineDemo } from './text-line';

import { SearchBoxDemo } from './search-box';
import { CalendarDemo } from './calendar';
import { ToastDemo } from './toast';
import { SelectDemo } from './select';
import { RegionDemo } from './region';

import { DialogDemo } from './dialog';
import { ChipsDemo } from './chips';
import { CodeHighlighterDemo } from './code-highlighter';
import { CodeBoxDemo } from './code-box';
import { DemoTree } from './tree';
import { DemoSideBar } from './side-bar/';
import { CardDemo } from './card';
import { AccordionDemo } from './accordion';
import { UploaderDemo } from './uploader';
import { DemoTransfer } from './transfer';
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
    { path: 'tabs', component: TabsDemo },
    { path: 'input', component: InputDemo },
    { path: 'step', component: StepDemo },
    { path: 'tooltip', component: TooltipDemo },
    { path: 'textarea', component: TextareaDemo },
    { path: 'table', component: TableDemo },
    { path: 'page', component: DemoPage },
    { path: 'schedule', component: DemoSchedule },
    { path: 'text-line', component: TextLineDemo },

    { path: 'search-box', component: SearchBoxDemo },
    { path: 'calendar', component: CalendarDemo },
    { path: 'toast', component: ToastDemo },
    { path: 'select', component: SelectDemo },
    { path: 'calendar', component: CalendarDemo },
    { path: 'region', component: RegionDemo },

    { path: 'dialog', component: DialogDemo },
    { path: 'tree', component: DemoTree },
    { path: 'side-bar', component: DemoSideBar },
    { path: 'chips', component: ChipsDemo },
    { path: 'code-highlighter', component: CodeHighlighterDemo },
    { path: 'code-box', component: CodeBoxDemo },
    { path: 'tree', component: DemoTree },
    { path: 'card', component: CardDemo },
    { path: 'accordion', component: AccordionDemo },
    { path: 'uploader', component: UploaderDemo },
    { path: 'transfer', component: DemoTransfer },
    { path: 'docs', component: GuideComponentDemo },
    { path: 'icons', component: IconsComponentDemo },
    { path: 'typography', component: TypographyDemo },
    { path: 'slider', component: SliderComponentDemo }
];
