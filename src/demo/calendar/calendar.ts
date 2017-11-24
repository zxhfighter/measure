import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'demo-calendar',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.less'],
    preserveWhitespaces: false
})
export class DemoCalendar {

    // theme sources
    tsCode: string = require('!!raw-loader!./monthview/monthview.ts');
    htmlCode: string = require('!!raw-loader!./monthview/monthview.html');
    lessCode: string = require('!!raw-loader!./monthview/monthview.less');

    // theme sources
    tsCodeCalendar: string = require('!!raw-loader!./calendar/calendar.ts');
    htmlCodeCalendar: string = require('!!raw-loader!./calendar/calendar.html');
    lessCodeCalendar: string = require('!!raw-loader!./calendar/calendar.less');

    // theme sources
    tsCodeDate: string = require('!!raw-loader!./datepicker/datepicker.ts');
    htmlCodeDate: string = require('!!raw-loader!./datepicker/datepicker.html');
    lessCodeDate: string = require('!!raw-loader!./datepicker/datepicker.less');

    // theme sources
    tsCodeRange: string = require('!!raw-loader!./daterangepicker/date-range.ts');
    htmlCodeRange: string = require('!!raw-loader!./daterangepicker/date-range.html');
    lessCodeRange: string = require('!!raw-loader!./daterangepicker/date-range.less');
}
