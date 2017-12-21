import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, Input
} from '@angular/core';

import { OnChange } from '../core/decorators';

/**
 * table row component
 */
@Component({
    selector: 'tr[nb-row]',
    template: '<ng-content></ng-content>',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'nb-table-row',
        '[class.nb-table-row-checked]': 'checked'
    },
    exportAs: 'nbRow'
})
export class TableRowComponent {

    /**
     * whether the table row is checked(selected)
     */
    @OnChange(true)
    @Input() checked: boolean = false;
}
