import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay';
import { ViewportRuler } from './scroll-strategy';
import { OverlayPositionService } from './overlay-position.service';
import { OverlayService } from './overlay.service';
import { OverlayPositionBuilder } from './overlay-position-builder';

@NgModule({
    imports: [CommonModule],
    declarations: [OverlayComponent],
    exports: [OverlayComponent],
    providers: [ViewportRuler, OverlayPositionService, OverlayService, OverlayPositionBuilder]
})
export class OverlayModule { }
