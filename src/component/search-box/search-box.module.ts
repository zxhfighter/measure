import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../input';
import { ButtonModule } from '../button';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        ButtonModule
    ],
    declarations: [
        SearchBoxComponent
    ],
    providers: [],
    exports: [
        SearchBoxComponent
    ]
})

export class SearchBoxModule { }
