import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion';

@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent],
    exports: [AccordionComponent]
})
export class AccordionModule {}
