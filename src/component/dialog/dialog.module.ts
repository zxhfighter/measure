import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog';
import { DialogHeaderComponent } from './dialog-header';
import { DialogBodyComponent } from './dialog-body';
import { DialogFooterComponent } from './dialog-footer';
import { AlertComponent } from './alert';
import { OverlayModule } from '../overlay';
import { ButtonModule } from '../button';
import { ConfirmComponent } from './confirm';

@NgModule({
    imports: [CommonModule, ButtonModule, OverlayModule],
    declarations: [DialogComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, AlertComponent, ConfirmComponent],
    exports: [DialogComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, AlertComponent, ConfirmComponent],
    entryComponents: [AlertComponent, ConfirmComponent]
})
export class DialogModule { }
