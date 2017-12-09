import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { SwitchComponent } from './switch';
import { GestureConfig } from '../core/gesture-config';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SwitchComponent
    ],
    exports: [
        SwitchComponent
    ],
    providers: [
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
    ]
})
export class SwitchModule { }
