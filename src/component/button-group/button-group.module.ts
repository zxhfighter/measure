import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonGroupComponent, ButtonToggleComponent} from './button-group';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ButtonGroupComponent,
        ButtonToggleComponent
    ],
    exports: [
        ButtonGroupComponent,
        ButtonToggleComponent
    ]
})
export class ButtonGroupModule {}
