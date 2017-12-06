import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideBarComponent} from './side-bar';
import {SearchBoxModule} from '../search-box/search-box.module';
import {TreeModule} from '../tree/tree.module';

@NgModule({
    imports: [CommonModule, SearchBoxModule, TreeModule],
    declarations: [SideBarComponent],
    exports: [SideBarComponent]
})
export class SideBarModule {}
