import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIButtonComponent} from './button';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        UIButtonComponent
    ],
    exports: [
        UIButtonComponent
    ]
})
export class UIButtonModule {}
