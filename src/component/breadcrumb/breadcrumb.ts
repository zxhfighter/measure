import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

/**
 * breadcurmb item type
 */
export type BreadcrumbItem = {

    /** breadcrumb text. */
    text: string;

    /** breadcrumb path, using with router. */
    path?: string;

    /**
     * breadcrumb href, using with href, when both path and href presents,
     * href has high priority.
     */
    href?: string;
};

@Component({
    selector: 'nb-breadcrumb',
    templateUrl: './breadcrumb.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-breadcrumb'
    }
})
export class BreadcrumbComponent {

    /** breadcrumb datasource */
    @Input() datasource: BreadcrumbItem[] = [];

    /**
     * set trackby function for `ngFor`
     *
     * @param {BreadcrumbItem} item - breadcrumb item
     * @docs-private
     */
    trackByText(item: BreadcrumbItem) {
        return item.text;
    }
}
