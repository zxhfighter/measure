import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from './input';
import { InputConfig } from './input.config';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        InputDirective
    ],
    exports: [
        InputDirective
    ],
    providers: [
        InputConfig
    ]
})
export class InputModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: InputModule, providers: [InputConfig] };
    }
}
