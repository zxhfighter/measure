
import { Directive, OnInit, Input, ViewContainerRef } from '@angular/core';

/**
 * 将指定组件或者指令渲染到当前指令所在节点
 */
@Directive({
  selector: '[nbAttach]',
  exportAs: 'nbAttach'
})

export class AttachDirective implements OnInit {

    /**
     * 任何组件或者指令
     */
    @Input() nbAttach;

    constructor(
        private _viewContainerRef: ViewContainerRef) {}

    ngOnInit() {
        this._viewContainerRef.createEmbeddedView(this.nbAttach.templateRef);
    }
}



