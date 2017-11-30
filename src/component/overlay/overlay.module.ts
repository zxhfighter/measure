import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay';

@NgModule({
    imports: [CommonModule],
    declarations: [OverlayComponent],
    exports: [OverlayComponent]
})
export class OverlayModule { }
