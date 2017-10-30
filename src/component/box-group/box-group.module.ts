import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckboxComponent} from './checkbox';
import {BoxGroupComponent} from './box-group';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CheckboxComponent,
        BoxGroupComponent
    ],
    exports: [
        CheckboxComponent,
        BoxGroupComponent
    ]
})
export class BoxGroupModule {}
