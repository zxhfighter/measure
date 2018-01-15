import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../index';

import { SliderComponent } from './slider';
import { SliderHandComponent } from './slider-hand';
import { SliderTrackerComponent } from './slider-tracker';
import { SliderService } from './slider.service';

@NgModule({
    imports: [CommonModule, FormsModule, TooltipModule],
    providers: [SliderService],
    declarations: [SliderComponent, SliderHandComponent, SliderTrackerComponent],
    exports: [SliderComponent, SliderHandComponent, SliderTrackerComponent]
})
export class SliderModule { }
