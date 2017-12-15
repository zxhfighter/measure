import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

/**
 * table header component
 */
@Component({
    selector: 'thead[nb-thead]',
    template: `<ng-content></ng-content>`,
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'class': 'nb-table-head' }
})
export class TableHeaderComponent { }
