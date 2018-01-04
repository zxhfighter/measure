import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip';
import { TiplayerComponent } from './tiplayer';
import { OverlayModule } from '../overlay';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [TooltipDirective, TiplayerComponent],
    exports: [TooltipDirective, TiplayerComponent],
    entryComponents: [TiplayerComponent]
})
export class TooltipModule { }
