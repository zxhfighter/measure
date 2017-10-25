import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YourComponentComponent} from './your-component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        YourComponentComponent
    ],
    exports: [
        YourComponentComponent
    ]
})
export class YourComponentModule {}
