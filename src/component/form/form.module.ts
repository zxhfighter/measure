import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form';
import { ButtonModule } from '../button';
import { InputModule } from '../input';

import { NbFormItemDirective } from './nb-form-item.directive';
import { NbFormControlComponent } from './nb-form-control.component';
import { NbFormExplainComponent } from './nb-form-explain.directive';
import { NbFormLabelDirective } from './nb-form-label.directive';
import { NbFormItemRequiredDirective } from './nb-form-item-required.directive';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputModule,
    ],
    declarations: [
        FormComponent,
        NbFormLabelDirective,
        NbFormItemDirective,
        NbFormControlComponent,
        NbFormExplainComponent,
        NbFormItemRequiredDirective
    ],
    exports: [
        FormComponent,
        NbFormLabelDirective,
        NbFormItemDirective,
        NbFormControlComponent,
        NbFormExplainComponent,
        NbFormItemRequiredDirective
    ]
})
export class FormModule { }
