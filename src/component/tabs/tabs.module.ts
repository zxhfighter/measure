import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs';
import { TabComponent } from './tab';
import { TooltipModule } from '../tooltip';

@NgModule({
    imports: [CommonModule, TooltipModule],
    declarations: [TabsComponent, TabComponent],
    exports: [TabsComponent, TabComponent]
})
export class TabsModule { }
