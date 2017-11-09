import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs';
import { TabComponent } from './tab';

@NgModule({
    imports: [CommonModule],
    declarations: [TabsComponent, TabComponent],
    exports: [TabsComponent, TabComponent]
})
export class TabsModule { }
