import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {
  ButtonModule,
  BreadcrumbModule,
  SwitchModule
} from '../component';

import {AppComponent} from './app.component';
import {appRoutes} from './app.router';


import {DemoButton} from './button';
import {DemoBreadcrumb} from './breadcrumb';
import {DemoSwitch} from './switch';

@NgModule({
  declarations: [
    AppComponent,
    DemoButton,
    DemoBreadcrumb,
    DemoSwitch
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ButtonModule.forRoot(),
    BreadcrumbModule,
    SwitchModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
