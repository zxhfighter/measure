import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip';
import { TiplayerComponent } from './tiplayer';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, TiplayerComponent],
    exports: [TooltipDirective, TiplayerComponent],
    entryComponents: [TiplayerComponent]
})
export class TooltipModule { }
