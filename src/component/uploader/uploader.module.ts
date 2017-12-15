import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader';
import { ButtonModule } from '../button';
import { ProgressBarModule } from '../progress-bar';

@NgModule({
    imports: [CommonModule, ButtonModule, ProgressBarModule],
    declarations: [UploaderComponent],
    exports: [UploaderComponent]
})
export class UploaderModule { }
