import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button';
import { TooltipModule } from '../tooltip';
import { OverlayModule } from '../overlay';

import { TableComponent } from './table';
import { TableBodyComponent } from './table-tbody';
import { TableHeaderComponent } from './table-thead';
import { TableTdComponent } from './table-td';
import { TableRowComponent } from './table-row';
import { TableHeaderItemComponent } from './table-th';

const components = [
    TableComponent,
    TableHeaderComponent,
    TableHeaderItemComponent,
    TableBodyComponent,
    TableRowComponent,
    TableTdComponent
];

@NgModule({
    imports: [CommonModule, ButtonModule, TooltipModule, OverlayModule],
    declarations: [...components],
    exports: [...components]
})
export class TableModule { }
