import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbRowDirective } from './row.directive';
import { NbColDirective } from './col.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NbRowDirective,
        NbColDirective
    ],
    exports: [
        NbRowDirective,
        NbColDirective
    ]
})
export class GridModule {
}
