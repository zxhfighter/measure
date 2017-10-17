import {
    Component, Input, Output, EventEmitter, NgModule,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, HostBinding
} from '@angular/core';

@Component({
    selector: 'ui-button',
    templateUrl: './button.html',
    styleUrls: ['./button.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class UIButtonComponent implements OnInit {
    name = 'ComponentName';
    @Input() disabled = false;
    @Input() size: 'lg'|'sm'|'xs' = 'sm';

    @HostBinding('attr.disabled') get () {
        return this.disabled || null;
    }

    constructor() {

    }

    ngOnInit() {

    }
}
