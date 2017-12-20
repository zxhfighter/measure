import {
    Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter,
    Input, Output
} from '@angular/core';

import { OnChange } from '../core/decorators';

/**
 * table td component
 */
@Component({
    selector: 'td[nb-td]',
    template: `
        <div class="nb-table-td-wrapper">
            <ng-content></ng-content>
            <i title="edit" class="iconfont icon-edit" *ngIf="editable && !editing" (click)="onEdit()"></i>
        </div>
    `,
    host: {
        'class': 'nb-table-td',
        '[class.nb-table-td-edit]': 'editable'
    },
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nbTd'
})
export class TableTdComponent {

    /**
     * when edit, emits a `edit` event
     */
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();

    /**
     * whether the cell is editable
     * @default false
     */
    @OnChange(true)
    @Input() editable: boolean = false;

    /**
     * whether the cell is editing
     * @default false
     */
    @Input() editing: boolean = false;

    /**
     * @docs-private
     */
    onEdit() {
        this.editing = true;
        this.edit.emit();
    }
}
