import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {DemoModule} from './demo/demo.module';
import {rootRouterModule} from './app.router';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    rootRouterModule,
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
