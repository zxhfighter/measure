import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBoxComponent} from './search-box';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputModule} from '../input/index';
import {ButtonModule} from '../button/index';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, InputModule, ButtonModule],
    declarations: [SearchBoxComponent],
    exports: [SearchBoxComponent]
})
export class SearchBoxModule {}
