import {
    Component,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-textarea',
    templateUrl: './textarea.html',
    styleUrls: ['./textarea.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class TextareaDemo {
    // theme sources
    tsCode: string = require('!!raw-loader!./themes/textarea-theme.ts');
    htmlCode: string = require('!!raw-loader!./themes/textarea-theme.html');
    lessCode: string = require('!!raw-loader!./themes/textarea-theme.less');
}
