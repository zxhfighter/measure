import {
    Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterContentInit,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

@Component({
    selector: 'nb-code-box',
    templateUrl: './code-box.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: true,
    host: {
        'class': 'nb-widget nb-codebox'
    },
    exportAs: 'nbCodeBox'
})
export class CodeBoxComponent implements OnInit, AfterViewInit, AfterContentInit {

    showSource: boolean = false;
    @Input() tsCode: string = '';
    @Input() htmlCode: string = '';
    @Input() lessCode: string = '';

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

    onToggleViewSource() {
        this.showSource = !this.showSource;
    }
}
