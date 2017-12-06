import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips';
import { ListItemDirective } from './chips.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ChipsComponent, ListItemDirective],
    exports: [ChipsComponent]
})
export class ChipsModule {}
