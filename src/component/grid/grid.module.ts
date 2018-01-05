import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from './grid';
import {NzRowComponent} from './nz-row.component';
import {NzColComponent} from './nz-col.component';

@NgModule({
    imports: [CommonModule],
    declarations: [GridComponent, NzRowComponent, NzColComponent],
    exports: [GridComponent, NzRowComponent, NzColComponent]
})
export class GridModule {
}
