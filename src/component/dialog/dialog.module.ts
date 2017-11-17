import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [DialogComponent],
    exports: [DialogComponent]
})
export class DialogModule { }
