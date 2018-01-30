import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog';
import { DialogHeaderComponent } from './dialog-header';
import { DialogBodyComponent } from './dialog-body';
import { DialogFooterComponent } from './dialog-footer';
import { DialogService } from './dialog.service';
import { AlertComponent } from './alert';
import { OverlayModule } from '../overlay';
import { ButtonModule } from '../button';

@NgModule({
    imports: [CommonModule, ButtonModule, OverlayModule],
    declarations: [DialogComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, AlertComponent],
    exports: [DialogComponent, DialogHeaderComponent, DialogBodyComponent, DialogFooterComponent, AlertComponent],
    entryComponents: [AlertComponent],
    providers: [DialogService]
})
export class DialogModule { }
