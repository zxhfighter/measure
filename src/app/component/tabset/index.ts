import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UITabset} from './tabset';
import {UITab} from './tab';

@NgModule({
    imports: [CommonModule],
    declarations: [UITabset, UITab],
    exports: [UITabset, UITab]
})
export class UITabsetModule {

}

