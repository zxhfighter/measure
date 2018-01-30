import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog';
import { DialogHeaderComponent } from './dialog-header';
import { DialogBodyComponent } from './dialog-body';
import { DialogFooterComponent } from './dialog-footer';
import { AlertComponent } from './alert';
import { OverlayModule } from '../overlay';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, ButtonModule, OverlayModule],
    declarations: [DialogComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, AlertComponent],
    exports: [DialogComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, AlertComponent],
<<<<<<< HEAD
    entryComponents: [AlertComponent],
    providers: [DialogService]
=======
    entryComponents: [AlertComponent]
>>>>>>> ac168232a4899e6791ec21cdd0d23cbe878e8464
})
export class DialogModule { }
