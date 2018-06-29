
import { Directive, ElementRef, TemplateRef } from '@angular/core';

/**
 * 自定义标签指令
 */
@Directive({
  selector: '[nbTabTitle]',
  exportAs: 'nbTabTitle'
})

export class TabTitleDirective {
  constructor(
        public elementRef: ElementRef,
        public templateRef: TemplateRef<any>) {}
}



