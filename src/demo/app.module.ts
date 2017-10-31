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
  BoxGroupModule
} from '../component';

import {AppComponent} from './app.component';
import {appRoutes} from './app.router';


import {DemoButton} from './button';
import {DemoBreadcrumb} from './breadcrumb';
import {DemoSwitch} from './switch';
import {DemoButtonGroup} from './button-group';
import {DemoBoxGroup} from './box-group';

import {DemoXXX} from './test-component/app';
import {ChildComponent, ParentComponent} from './test-component/test';

@NgModule({
  declarations: [
    AppComponent,
    DemoButton,
    DemoBreadcrumb,
    DemoSwitch,
    DemoButtonGroup,
    DemoBoxGroup,
    ChildComponent,
    ParentComponent,
    DemoXXX
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
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
