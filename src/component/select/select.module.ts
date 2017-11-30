import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';
import { OverlayModule } from '../overlay';
import { SelectComponent } from './select';
import { SelectOptionsComponent } from './select.options';

@NgModule({
    imports: [CommonModule, ButtonModule, OverlayModule],
    declarations: [SelectComponent, SelectOptionsComponent],
    exports: [SelectComponent],
    entryComponents: [SelectOptionsComponent]
})
export class SelectModule { }
