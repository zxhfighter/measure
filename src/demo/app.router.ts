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
import { PageDemo } from './page';
import { ScheduleDemo } from './schedule';
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
import { TreeDemo } from './tree';
import { SideBarDemo } from './side-bar/';
import { CardDemo } from './card';
import { AccordionDemo } from './accordion';
import { UploaderDemo } from './uploader';
import { TransferDemo } from './transfer';
import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { TypographyDemo } from './typography';
import { SliderComponentDemo } from './slider';
import { FormDemo } from './form';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'components/button' },
    { path: 'components', pathMatch: 'full', redirectTo: 'components/button' },
    { path: 'components/button', component: ButtonDemo },
    { path: 'components/breadcrumb', component: BreadcrumbDemo },
    { path: 'components/switch', component: SwitchDemo },
    { path: 'components/button-group', component: ButtonGroupDemo },
    { path: 'components/box-group', component: BoxGroupDemo },
    { path: 'components/chart', component: ChartDemo },
    { path: 'components/progress-bar', component: ProgressBarDemo },
    { path: 'components/spinner', component: SpinnerDemo },
    { path: 'components/carousel', component: CarouselDemo },
    { path: 'components/tabs', component: TabsDemo },
    { path: 'components/input', component: InputDemo },
    { path: 'components/step', component: StepDemo },
    { path: 'components/tooltip', component: TooltipDemo },
    { path: 'components/textarea', component: TextareaDemo },
    { path: 'components/table', component: TableDemo },
    { path: 'components/page', component: PageDemo },
    { path: 'components/schedule', component: ScheduleDemo },
    { path: 'components/text-line', component: TextLineDemo },

    { path: 'components/search-box', component: SearchBoxDemo },
    { path: 'components/calendar', component: CalendarDemo },
    { path: 'components/toast', component: ToastDemo },
    { path: 'components/select', component: SelectDemo },
    { path: 'components/calendar', component: CalendarDemo },
    { path: 'components/region', component: RegionDemo },

    { path: 'components/dialog', component: DialogDemo },
    { path: 'components/tree', component: TreeDemo },
    { path: 'components/side-bar', component: SideBarDemo },
    { path: 'components/chips', component: ChipsDemo },
    { path: 'components/code-highlighter', component: CodeHighlighterDemo },
    { path: 'components/code-box', component: CodeBoxDemo },
    { path: 'components/tree', component: TreeDemo },
    { path: 'components/card', component: CardDemo },
    { path: 'components/accordion', component: AccordionDemo },
    { path: 'components/uploader', component: UploaderDemo },
    { path: 'components/transfer', component: TransferDemo },
    { path: 'docs', component: GuideComponentDemo },
    { path: 'icons', component: IconsComponentDemo },
    { path: 'components/typography', component: TypographyDemo },
    { path: 'components/slider', component: SliderComponentDemo },
    { path: 'components/form', component: FormDemo }
];
