import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

/**
 * table body component
 */
@Component({
    selector: 'tbody[nb-tbody]',
    template: `<ng-content></ng-content>`,
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { 'class': 'nb-table-body' },
    exportAs: 'nbTableBody'
})
export class TableBodyComponent { }
