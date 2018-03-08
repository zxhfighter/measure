import { Component, Output, EventEmitter, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { OverlayOriginDirective, OverlayComponent } from '../../../component/overlay';
import { TiplayerComponent } from '../../../component/tooltip/tiplayer';
import { deepClone } from '../../../component/util/clone';

@Component({
    selector: 'demo-tooltip-statically',
    templateUrl: './tooltip-statically.html',
    styleUrls: ['./tooltip-statically.less']
})
export class TooltipStaticallyDemo {

    @ViewChildren(OverlayOriginDirective) originList: QueryList<OverlayOriginDirective>;

    @ViewChild(TiplayerComponent) overlay: TiplayerComponent;

    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {

    }

    onIknowthat() {
        this.close.emit();
    }

    onToggle() {
        this.overlay.isVisible() ? this.overlay.hide() : this.overlay.show();
    }

    showTooltip(event, origin) {
        this.overlay.origin = origin;
        this.overlay.show();
        // 需要阻止默认事件，否则会响应overlay组件中对document的事件绑定。
        event.stopPropagation();
    }
}
