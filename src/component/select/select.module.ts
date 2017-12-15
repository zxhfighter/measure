import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';
import { InputModule } from '../input';
import { OverlayModule } from '../overlay';
import { SelectComponent } from './select';
import { SelectOptionsComponent } from './select.options';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputModule,
        OverlayModule
    ],
    declarations: [
        SelectComponent,
        SelectOptionsComponent
    ],
    exports: [SelectComponent],
    entryComponents: [SelectOptionsComponent]
})
export class SelectModule { }
