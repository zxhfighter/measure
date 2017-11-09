import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonModule} from '../button';

import {
    TableComponent,
    TableHeaderComponent,
    TableHeaderItemComponent,
    TableBodyComponent,
    TableRowComponent,
    TableTdComponent
} from './table';

const components = [
    TableComponent,
    TableHeaderComponent,
    TableHeaderItemComponent,
    TableBodyComponent,
    TableRowComponent,
    TableTdComponent
];

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [...components],
    exports: [...components]
})
export class TableModule {}
