import {
    Component, OnInit, Input, ContentChildren, QueryList, Optional, forwardRef
} from '@angular/core';


@Component({
    selector: 'x-parent',
    template: `
        <ng-content></ng-content>
    `
})
export class ParentComponent {
    @ContentChildren(forwardRef(() => ChildComponent)) children: QueryList<ChildComponent>;

    private _name: string;
    @Input() get name() {return this._name;}
    set name(value: any) {
        console.log('parent bind property');
        this._name = value;
    }

    constructor() {
        console.log('parent constructor');

    }

    ngOnInit() {
        console.log('parent onInit');
    }

    ngAfterViewInit() {
        console.log('parent AfterViewInit');
    }
}


@Component({
    selector: 'x-child',
    template: `
        child {{ name }}
    `
})
export class ChildComponent {
    private _name: string;
    @Input() get name() {return this._name;}
    set name(value: any) {
        console.log('child bind property');
        this._name = value;
    }

    parent: ParentComponent;
    constructor(@Optional() _parent: ParentComponent) {
        this.parent = _parent;

        console.log('child constructor');
    }

    ngOnInit() {
        console.log('child OnInit', this.parent);
    }

    ngAfterViewInit() {
        console.log('child AfterViewInit');
    }
}
