import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputBoxComponent } from './box';
import { BoxGroupComponent } from './box-group';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InputBoxComponent,
        BoxGroupComponent
    ],
    exports: [
        InputBoxComponent,
        BoxGroupComponent
    ]
})
export class BoxGroupModule { }
