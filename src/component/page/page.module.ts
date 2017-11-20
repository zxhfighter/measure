import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageComponent} from './page';
import {SelectModule} from '../select';   

@NgModule({
    imports: [CommonModule, SelectModule],
    declarations: [PageComponent],
    exports: [PageComponent]
})
export class PageModule {}
