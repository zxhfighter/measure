import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

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
    selector: 'x-breadcrumb',
    templateUrl: './breadcrumb.html',
    styleUrls: ['./breadcrumb.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'x-widget x-breadcrumb'
    }
})
export class BreadcrumbComponent {

    /** breadcrumb datasource */
    @Input() datasource: BreadcrumbItem[] = [];

    trackByText(item: BreadcrumbItem) {
        return item.text;
    }
}
