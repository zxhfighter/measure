import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
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
  TableModule,
  TabsModule,
  StepModule,
  TooltipModule
} from '../component';

import {AppComponent} from './app.component';
import {appRoutes} from './app.router';

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
import {DemoTable} from './table';
import {DemoTooltip} from './tooltip';

@NgModule({
  declarations: [
    AppComponent,
    DemoButton,
    DemoBreadcrumb,
    DemoSwitch,
    DemoButtonGroup,
    DemoBoxGroup,
    DemoChart,
    DemoProgressBar,
    DemoSpinner,
    DemoCarousel,
    DemoTable,
    DemoTabs,
    DemoStep,
    DemoTooltip
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
    TabsModule,
    StepModule,
    TableModule,
    TooltipModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
