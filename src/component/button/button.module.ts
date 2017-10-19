import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button';
import {ButtonConfig} from './button.config';

@NgModule({
    imports: [CommonModule],
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
    providers: [ButtonConfig]
})
export class ButtonModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: ButtonModule, providers: [ButtonConfig]};
    }
}
