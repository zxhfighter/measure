import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from '../tooltip';
import { RatingComponent } from './rating';

@NgModule({
    imports: [CommonModule, TooltipModule],
    declarations: [RatingComponent],
    exports: [RatingComponent]
})
export class RatingModule { }
