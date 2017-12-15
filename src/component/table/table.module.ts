import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button';

import {
    TableComponent,
    TableHeaderItemComponent,
    TableRowComponent,
    TableTdComponent
} from './table';

import { TableBodyComponent } from './table-tbody';
import { TableHeaderComponent } from './table-thead';

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
export class TableModule { }
