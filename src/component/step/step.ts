import {
    Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, Renderer2, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ContentChildren, QueryList, Optional,
    ChangeDetectorRef
} from '@angular/core';

import { OnChange } from '../core/decorators';

/**
 * Step component
 */
@Component({
    selector: 'nb-step',
    templateUrl: './step.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-step'
    }
})
export class StepComponent implements AfterViewInit {

    /** current step value */
    @OnChange()
    @Input() value: number = 1;
    valueChange: EventEmitter<number> = new EventEmitter<number>();

    /** custom skin value */
    @Input() skin: string;

    /** step item list chilren */
    @ContentChildren(forwardRef(() => StepItemComponent)) _children: QueryList<StepItemComponent>;

    constructor(private _el: ElementRef, private _render: Renderer2) {

        // bind value change, update children status
        this.valueChange.subscribe(
            (step: number) => {
                this.value = step;
                this.updateChildrenStatus(step);
            }
        );
    }

    ngAfterViewInit() {

        // add skin class
        let className = this._el.nativeElement.className;
        if (this.skin) {
            className += ` nb-step-${this.skin}`;
            this._render.setAttribute(this._el.nativeElement, 'class', className);
        }
    }

    /**
     * update children status
     *
     * @param {number} step - current step
     * @docs-private
     */
    updateChildrenStatus(step: number) {
        if (this._children) {
            this._children.forEach(v => {
                if (v.value === step) {
                    v.active = true;
                    v.success = false;
                }
                else if (v.value < step) {
                    v.success = true;
                    v.active = false;
                }
                else {
                    v.active = false;
                    v.success = false;
                }
            });
        }
    }
}

/**
 * Step item component
 */
@Component({
    selector: 'nb-step-item',
    template: `
        <div class="nb-step-item-title">
            <ng-container *ngIf="success"><i class="iconfont icon-check"></i></ng-container>
            <ng-container *ngIf="!success">{{ value }}</ng-container>
        </div>
        <div class="nb-step-item-content">
            <ng-content></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-step-item',
        '[class.active]': 'active',
        '[class.success]': 'success',
        '[class.error]': 'error'
    }
})
export class StepItemComponent implements AfterViewInit, OnInit {

    /**
     * step item value
     */
    @Input() value: number;

    _success: boolean = false;

    /** Whether the step item is done success */
    @Input() get success() { return this._success; }
    set success(value: any) {
        this._success = !!value;
        this._cd.markForCheck();
    }

    /** Whether the step item is done error */
    @Input() error: boolean;

    /** Whether the step item is active */
    @Input() active: boolean;

    /** The extra skin class */
    @Input() skin: string;

    /** The optional parent step component */
    _parentBox: StepComponent;

    constructor(
        @Optional() parentBox: StepComponent,
        private _el: ElementRef,
        private _render: Renderer2,
        private _cd: ChangeDetectorRef
    ) {
        this._parentBox = parentBox;
    }

    ngOnInit() {
        if (this._parentBox) {
            const currentStep = this._parentBox.value;
            if (this.value === currentStep) {
                this.active = true;
                this.success = false;
            }
            else if (this.value < currentStep) {
                this.active = false;
                this.success = true;
            }
            else {
                this.active = false;
                this.success = false;
            }
            this._cd.markForCheck();
        }
    }

    ngAfterViewInit() {
        let className = this._el.nativeElement.className;
        if (this.skin) {
            className += ` nb-step-item-${this.skin}`;
            this._render.setAttribute(this._el.nativeElement, 'class', className);
        }
    }
}
