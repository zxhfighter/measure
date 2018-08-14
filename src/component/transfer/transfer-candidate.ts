import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { futimesSync } from 'fs';
import { Event } from '@angular/router/src/events';

@Component({
    selector: 'nb-transfer-candidate',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})

export class TransferCandidateComponent {}
