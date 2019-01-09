import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    AfterViewInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    forwardRef,
    ChangeDetectorRef,
    ElementRef,
    Renderer2,
    SimpleChanges,
    OnDestroy
} from '@angular/core';

import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { TransferService } from './transfer.service';

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const TRANSFER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TransferComponent),
    multi: true
};

@Component({
    selector: 'nb-transfer',
    templateUrl: './transfer.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    providers: [TRANSFER_VALUE_ACCESSOR],
    host: {
        'class': 'nb-widget nb-transfer'
    },
    exportAs: 'nbTransfer'
})

export class TransferComponent implements OnDestroy {

    /** search event */
    @Output() searchValue: EventEmitter<object> = new EventEmitter<object>();

    /** tree node expand event */
    @Output() onExpandNode: EventEmitter<object> = new EventEmitter<object>();

    /** tree node all trans event */
    @Output() onTransAll: EventEmitter<object> = new EventEmitter<object>();

    /** tree add extend data event */
    @Output() onExtendData: EventEmitter<object> = new EventEmitter<object>();

    /**
     * Whether the transfer is disabled
     * @default false
     */
    @Input() disabled: boolean = false;

    /**
     * Whether the transfer is can all-trans
     * @default false
     */
    @Input() allSelectLink: boolean = true;

    /**
     * Whether the transfer is can all-delete
     * @default false
     */
    @Input() allDeleteLink: boolean = true;

    /**
     * Whether the transfer candidate is have search
     * @default false
     */
    @Input() candidateSearch: boolean = true;

    /**
     * Whether the transfer selected is have search
     * @default false
     */
    @Input() selectedSearch: boolean = true;

    /**
     * candidate list title
     */
    @Input() candidateTitle: string = '备选列表';

    /**
     * selected list title
     */
    @Input() selectedTitle: string = '已选列表';

    /**
     * add extend data link config
     */
    @Input() addLink: any = {
        text: '',
        flag: false
    };

    /**
     * all options count
     * @docs-private
     */
    candidateCount: number = 0;

    /**
     * all selected options count
     * @docs-private
     */
    selectedCount: number = 0;

    private subscription: Subscription;

    constructor(
        private _cd: ChangeDetectorRef,
        private service: TransferService
    ) {
        this.subscription = this.service.getMsg().subscribe(msg => {
            if (typeof msg.candidateCount === 'number') {
                this.candidateCount = msg.candidateCount;
            }
            if (typeof msg.selectedCount === 'number') {
                this.selectedCount = msg.selectedCount;
            }
            this._cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    /**
     * clear search results
     * @docs-private
     */
    clearSearch(event: string, mode: string) {
        this.searchByKeyWord(event, mode);
    }

    /**
     * fitler candidate or selected list by key word
     * @docs-private
     */
    searchByKeyWord(event: string, mode: string) {
        // 向组件外部暴露搜索事件
        this.searchValue.emit({
            event: event,
            mode: mode
        });
    }

    /**
     * tree node expand event
     * @docs-private
     */
    expandNode(event) {
        this.onExpandNode.emit(event);
    }

    /**
     * trans all options to Selected or not
     * @docs-private
     */
    transAll(mode: string, chkVal: boolean) {
        this.onTransAll.emit({
            mode: mode,
            chkVal: chkVal
        });
    }

    /**
     * extend data
     * @docs-private
     */
    extendData() {
        this.onExtendData.emit();
    }
}
