import {Directive, Input, TemplateRef, ElementRef, OnInit, NgModule} from '@angular/core';
import {UIControl} from '../control';
const prefix = UIControl.uiPrefix;

declare var Prism: any;

@Directive({
    selector: `[${prefix}Code]`
})
export class UICodeHighLightDirective implements OnInit {

    constructor(private el: ElementRef) {}

    ngOnInit() {
        Prism.highlightElement(this.el.nativeElement);
    }
}

@NgModule({
    declarations: [UICodeHighLightDirective],
    exports: [UICodeHighLightDirective]
})
export class UICodeHighLightModule {}
