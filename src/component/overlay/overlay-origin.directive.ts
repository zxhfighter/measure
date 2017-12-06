import {
    Directive,
    ElementRef
  } from '@angular/core';

@Directive({
  selector: '[nbOverlayOrigin]',
  exportAs: 'nbOverlayOrigin'
})

export class OverlayOriginDirective {
  constructor(
      /** Reference to the element on which the directive is applied. */
      public elementRef: ElementRef) { }
}
