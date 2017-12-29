import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form';
import { ButtonModule } from '../button';
import { InputModule } from '../input';

import { NbFormControlComponent } from './nb-form-control.component';
import { NbFormExplainComponent } from './nb-form-explain.component';
import { NbFormItemComponent } from './nb-form-item.component';
import { NbFormLabelComponent } from './nb-form-label.component';
import { NbFormItemRequiredComponent } from './nb-form-item-required.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputModule,
    ],
    declarations: [
        FormComponent,
        NbFormLabelComponent,
        NbFormItemComponent,
        NbFormControlComponent,
        NbFormExplainComponent,
        NbFormItemRequiredComponent
    ],
    exports: [
        FormComponent,
        NbFormLabelComponent,
        NbFormItemComponent,
        NbFormControlComponent,
        NbFormExplainComponent,
        NbFormItemRequiredComponent
    ]
})
export class FormModule { }
