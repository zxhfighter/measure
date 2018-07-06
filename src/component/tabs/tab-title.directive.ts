
import { Directive, TemplateRef, Input } from '@angular/core';

/**
 * 自定义标签指令
 */
@Directive({
  selector: '[nbTabTitle]',
  exportAs: 'nbTabTitle'
})

export class TabTitleDirective {

    /**
     * 标签标题
     */
    @Input() nbTabTitle: string;

    constructor(
        public templateRef: TemplateRef<any>) {}
}



