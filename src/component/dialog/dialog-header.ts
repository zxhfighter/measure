import {
    Component, Input, Output, EventEmitter, AfterViewInit, AfterContentInit, ElementRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { futimesSync } from 'fs';
import { Event } from '@angular/router/src/events';

@Component({
    selector: 'nb-dialog-header',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})

export class DialogHeaderComponent {

    @Input() closable: boolean;

    constructor() {

    }

}
