import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzRowComponent} from './nz-row.component';
import {NzColComponent} from './nz-col.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NzRowComponent,
        NzColComponent],
    exports: [
        NzRowComponent,
        NzColComponent
    ]
})
export class GridModule {
}
