import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips';
import { InputModule } from '../input';
import { ListItemDirective } from './chips.directive';

@NgModule({
    imports: [CommonModule, InputModule],
    declarations: [ChipsComponent, ListItemDirective],
    exports: [ChipsComponent]
})
export class ChipsModule {}
