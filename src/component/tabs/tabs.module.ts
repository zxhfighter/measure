import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs';
import { TabComponent } from './tab';
import { TabHeaderComponent } from './tab-header';
import { TabTitleDirective } from './tab-title.directive';
import { AttachDirective } from './attach.directive';
import { InkBarComponent } from './ink-bar';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [TabsComponent, TabComponent, InkBarComponent, TabHeaderComponent, TabTitleDirective, AttachDirective],
    exports: [TabsComponent, TabComponent, InkBarComponent, TabHeaderComponent, TabTitleDirective, AttachDirective]
})
export class TabsModule { }
