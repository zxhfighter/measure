import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';

import {
  ButtonModule,
  BreadcrumbModule
} from '../component';

import {DemoButton} from './button';
import {DemoBreadcrumb} from './breadcrumb';
import {appRoutes} from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    DemoButton,
    DemoBreadcrumb
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ButtonModule.forRoot(),
    BreadcrumbModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
