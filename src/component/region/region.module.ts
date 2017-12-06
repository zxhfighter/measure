import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionComponent } from './region';

import { BoxGroupModule } from '../box-group';

@NgModule({
    imports: [CommonModule, BoxGroupModule],
    declarations: [RegionComponent],
    exports: [RegionComponent]
})
export class RegionModule { }
