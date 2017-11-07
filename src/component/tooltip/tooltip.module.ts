import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipComponent} from './tooltip';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipComponent],
    exports: [TooltipComponent]
})
export class TooltipModule {}
