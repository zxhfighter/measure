import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page';
import { SelectModule } from '../select';

@NgModule({
    imports: [FormsModule, CommonModule, SelectModule],
    declarations: [PageComponent],
    exports: [PageComponent]
})
export class PageModule { }
