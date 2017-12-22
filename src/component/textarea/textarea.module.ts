import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaDirective } from './textarea';
import { TextareaConfig } from './textarea.config';

@NgModule({
    imports: [CommonModule],
    declarations: [TextareaDirective],
    exports: [TextareaDirective],
    providers: [TextareaConfig]
})
export class TextareaModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: TextareaModule, providers: [TextareaConfig] };
    }
}
