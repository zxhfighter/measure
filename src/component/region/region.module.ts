import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region';

import { BoxGroupModule } from '../box-group';
import { OverlayModule } from '../overlay';

@NgModule({
    imports: [CommonModule, BoxGroupModule, OverlayModule],
    declarations: [RegionComponent],
    exports: [RegionComponent]
})
export class RegionModule { }
