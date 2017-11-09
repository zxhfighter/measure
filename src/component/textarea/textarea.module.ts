import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextareaComponent} from './textarea';
import {TextareaConfig} from './textarea.config';

@NgModule({
    imports: [CommonModule],
    declarations: [TextareaComponent],
    exports: [TextareaComponent],
    providers: [TextareaConfig]
})
export class TextareaModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: TextareaModule, providers: [TextareaConfig]};
    }
}
