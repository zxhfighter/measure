import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextLineComponent} from './text-line';

@NgModule({
    imports: [CommonModule],
    declarations: [TextLineComponent],
    exports: [TextLineComponent]
})
export class TextLineModule {}
