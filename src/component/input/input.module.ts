import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input';
import {InputConfig} from './input.config';

@NgModule({
    imports: [CommonModule],
    declarations: [InputComponent],
    exports: [InputComponent],
    providers: [InputConfig]
})
export class InputModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: InputModule, providers: [InputConfig]};
    }
}
