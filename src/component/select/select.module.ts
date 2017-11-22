import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../button';
import {SelectComponent} from './select';
import {SelectOptionsComponent} from './select.options';

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [SelectComponent, SelectOptionsComponent],
    exports: [SelectComponent],
    entryComponents: [SelectOptionsComponent]
})
export class SelectModule {}
