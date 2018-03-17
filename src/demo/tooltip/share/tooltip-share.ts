import { Component, Output, EventEmitter, OnInit, ViewChild, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { OverlayOriginDirective, OverlayComponent } from '../../../component/overlay';
import { TiplayerComponent } from '../../../component/tooltip/tiplayer';
import { deepClone } from '../../../component/util/clone';
import { Field } from '../../../component/table';

@Component({
    selector: 'demo-tooltip-share',
    templateUrl: './tooltip-share.html',
    styleUrls: ['./tooltip-share.less'],
    encapsulation: ViewEncapsulation.None,
})
export class TooltipShareDemo {

    @ViewChild(TiplayerComponent) overlay: TiplayerComponent;

    currValue: string = '';

    fields: Field[] = [
        {
            name: 'name',
            title: '名称',
            sortable: false,
            filterable: false,
            tipable: false
        },
        {
            name: 'operation',
            title: '操作',
            sortable: false,
            filterable: false,
            tipable: false
        }
    ];

    datasource: any[] = [
        {
            id: 1,
            name: '好看视频',
        },
        {
            id: 2,
            name: '智能音箱',
        }
    ];

    constructor() {
    }

    showTooltip(event, origin, value) {
        this.overlay.changeOrigin(origin);
        this.currValue = value;
        this.overlay.show();
        // 需要阻止默认事件，否则会响应overlay组件中对document的事件绑定。
        event.stopPropagation();
    }

    confirm() {
        this.overlay.show();
    }

    close() {
        this.overlay.hide();
    }
}
