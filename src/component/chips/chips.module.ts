import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipsComponent} from './chips';
import {InputModule} from '../input';

@NgModule({
    imports: [CommonModule, InputModule],
    declarations: [ChipsComponent],
    exports: [ChipsComponent]
})
export class ChipsModule {}
