import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'nb-uploader',
    templateUrl: './uploader.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-uploader'
    },
    exportAs: 'nbUploader'
})
export class UploaderComponent implements OnInit {
    constructor() {

    }

    ngOnInit() {

    }
}
