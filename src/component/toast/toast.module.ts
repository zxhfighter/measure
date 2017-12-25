import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastComponent } from './toast';
import { ToastItemComponent } from './toast.item';
import { ToastConfig } from './toast.config';

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [ToastComponent, ToastItemComponent],
    providers: [{
        provide: ToastConfig,
        useValue: {
            duration: 2000,
            animate: true
        }
    }],
    exports: [ToastComponent],
    entryComponents: [ToastComponent, ToastItemComponent]
})
export class ToastModule {
}
