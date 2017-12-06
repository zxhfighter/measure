import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay';
import { ViewportRuler } from './scroll-strategy';
import { OverlayPositionService } from './overlay-position.service';
import { OverlayService } from './overlay.service';
import { OverlayOriginDirective } from './overlay-origin.directive';
import { OverlayPositionBuilder } from './overlay-position-builder';

@NgModule({
    imports: [CommonModule],
    declarations: [OverlayComponent, OverlayOriginDirective],
    exports: [OverlayComponent, OverlayOriginDirective],
    providers: [ViewportRuler, OverlayPositionService, OverlayService, OverlayPositionBuilder]
})
export class OverlayModule { }
