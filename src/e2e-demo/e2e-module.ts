import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { ButtonModule } from '../component/button';

import { E2ERouterModule } from './e2e-route';

import { RootComponent } from './root-app/root-app';
import { ButtonComponent } from './button/button-e2e';

const modules = [
    ButtonModule
];

const components = [
    RootComponent,
    ButtonComponent
];

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        E2ERouterModule,
        ...modules
    ],
    declarations: [
        ...components
    ],
    providers: [],
    bootstrap: [
        RootComponent
    ],
    exports: []
})
export class AppModule { }
