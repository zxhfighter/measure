import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs';
import { TabComponent } from './tab';
import { TabHeaderComponent } from './tab-header';
import { InkBarComponent } from './ink-bar';
import { TooltipModule } from '../tooltip';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, TooltipModule, ButtonModule],
    declarations: [TabsComponent, TabComponent, InkBarComponent, TabHeaderComponent],
    exports: [TabsComponent, TabComponent, InkBarComponent, TabHeaderComponent]
})
export class TabsModule { }
