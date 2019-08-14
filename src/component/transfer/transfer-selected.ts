import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { futimesSync } from 'fs';

@Component({
    selector: 'nb-transfer-selected',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})

export class TransferSelectedComponent {}
