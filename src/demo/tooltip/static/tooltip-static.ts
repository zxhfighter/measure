import { Component, Output, EventEmitter, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { OverlayOriginDirective, OverlayComponent } from '../../../component/overlay';
import { TiplayerComponent } from '../../../component/tooltip';
import { deepClone } from '../../../component/util/clone';

@Component({
    selector: 'demo-tooltip-static',
    templateUrl: './tooltip-static.html',
    styleUrls: ['./tooltip-static.less']
})
export class TooltipStaticDemo {

    @ViewChildren(OverlayOriginDirective) originList: QueryList<OverlayOriginDirective>;

    @ViewChild(TiplayerComponent, {static: false}) overlay: TiplayerComponent;

    constructor() {

    }

    onIknowthat() {
        this.overlay.hide();
    }

    showTooltip(event) {
        this.overlay.show();

        // 需要阻止默认事件，否则会响应overlay组件中对document的事件绑定。
        event.stopPropagation();
    }
}
