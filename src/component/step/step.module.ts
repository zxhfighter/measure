import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent, StepItemComponent } from './step';

@NgModule({
    imports: [CommonModule],
    declarations: [StepComponent, StepItemComponent],
    exports: [StepComponent, StepItemComponent]
})
export class StepModule { }
