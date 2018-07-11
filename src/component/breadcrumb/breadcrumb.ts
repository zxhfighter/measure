import {
    Component, Input, ViewEncapsulation, ChangeDetectionStrategy
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

    /**
     * breadcrumb path query params
     */
    queryParams?: any;
};

/**
 * Breadcrumb Component
 */
@Component({
    selector: 'nb-breadcrumb',
    templateUrl: './breadcrumb.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-breadcrumb'
    },
    exportAs: 'nbBreadcrumb'
})
export class BreadcrumbComponent {

    /**
     * breadcrumb datasource, each item contains a `text`、`path`（optional）、`href`（optional）property
     * @default []
     */
    @Input() datasource: BreadcrumbItem[] = [];

    /**
     * the common query params for every router link
     * @type {*}
     */
    @Input() queryParams: any;

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
