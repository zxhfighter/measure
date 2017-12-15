import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay';
import { ViewportRuler } from './scroll-strategy';
import { OverlayPositionService } from './overlay-position.service';
import { OverlayOriginDirective } from './overlay-origin.directive';
import { OverlayPositionBuilder } from './overlay-position-builder';
import { DynamicComponentService } from './dynamic-component.service';

@NgModule({
    imports: [CommonModule],
    declarations: [OverlayComponent, OverlayOriginDirective],
    exports: [OverlayComponent, OverlayOriginDirective],
    providers: [ViewportRuler, OverlayPositionService, DynamicComponentService, OverlayPositionBuilder]
})
export class OverlayModule { }
