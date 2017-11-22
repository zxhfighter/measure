import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  ButtonModule,
  BreadcrumbModule,
  SwitchModule,
  ButtonGroupModule,
  BoxGroupModule,
  ChartModule,
  ProgressBarModule,
  SpinnerModule,
  CarouselModule,
  InputModule,
  TableModule,
  TabsModule,
  StepModule,
  TooltipModule,
  PageModule,
  TextareaModule,
  TextLineModule,
  SearchBoxModule,
  ToastModule,
  ToastService,
  SelectModule,
  CalendarModule,
  RegionModule,
  DialogModule,
  CodeHighlighterModule,
  CodeBoxModule
} from '../component';

import {AppComponent} from './app.component';
import {appRoutes} from './app.router';

import {DemoProgressBar} from './progress-bar';
import {DemoSpinner} from './spinner';
import {DemoCarousel} from './carousel';
import {DemoInput} from './input';
import {DemoTabs} from './tabs';
import {DemoStep} from './step';
import {DemoTable} from './table';
import {DemoTooltip} from './tooltip';
import {DemoPage} from './page';
import {DemoTextarea} from './textarea';
import {DemoTextLine} from './text-line';
import {DemoSearchBox} from './search-box';
import {DemoCalendar} from './calendar';
import {DemoToast} from './toast';
import {DemoSelect} from './select';
import {DemoRegion} from './region';
import {DemoDialog} from './dialog';
import {DemoCodeHighlighter} from './code-highlighter';
import {DemoCodeBox} from './code-box';


import {ButtonDemoModule} from './button';
import {BreadcrumbDemoModule} from './breadcrumb';
import {SwitchDemoModule} from './switch';
import {ButtonGroupDemoModule} from './button-group';
import {BoxGroupDemoModule} from './box-group';
import {ChartDemoModule} from './chart';

const demoModules = [
    ButtonDemoModule,
    BreadcrumbDemoModule,
    SwitchDemoModule,
    ButtonGroupDemoModule,
    BoxGroupDemoModule,
    ChartDemoModule
];

@NgModule({
  declarations: [
    AppComponent,
    DemoProgressBar,
    DemoSpinner,
    DemoCarousel,
    DemoInput,
    DemoTable,
    DemoTabs,
    DemoStep,
    DemoTooltip,
    DemoPage,
    DemoTextarea,
    DemoTextLine,
    DemoSearchBox,
    DemoCalendar,
    DemoToast,
    DemoSelect,
    DemoCalendar,
    DemoRegion,
    DemoDialog,
    DemoCodeHighlighter,
    DemoCodeBox
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule.forRoot(),
    BreadcrumbModule,
    SwitchModule,
    ButtonGroupModule,
    BoxGroupModule,
    ChartModule,
    ProgressBarModule,
    SpinnerModule,
    CarouselModule,
    InputModule,
    TabsModule,
    StepModule,
    TableModule,
    PageModule,
    TooltipModule,
    TextareaModule,
    TextLineModule,
    SearchBoxModule,
    CalendarModule,
    ToastModule,
    SelectModule,
    RegionModule,
    DialogModule,
    CodeHighlighterModule,
    CodeBoxModule,

    // demos
    ...demoModules,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule {}
