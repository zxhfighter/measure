import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarComponent} from './progress-bar';
import {ProgressBarCircleComponent} from './progress-bar-circle';

@NgModule({
    imports: [CommonModule],
    declarations: [ProgressBarComponent, ProgressBarCircleComponent],
    exports: [ProgressBarComponent, ProgressBarCircleComponent]
})
export class ProgressBarModule {}
