import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbRowComponent} from './nb-row.component';
import {NbColComponent} from './nb-col.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NbRowComponent,
        NbColComponent],
    exports: [
        NbRowComponent,
        NbColComponent
    ]
})
export class GridModule {
}
