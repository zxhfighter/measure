import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleModule } from '../../component/schedule';
import { CodeBoxModule } from '../../component/code-box';
import { CodeHighlighterModule } from '../../component/code-highlighter';

import { ScheduleDemo } from './schedule';
import { ScheduleSelectedDemo } from './selected/schedule-selected';

@NgModule({
    imports: [
        CommonModule,
        ScheduleModule,
        CodeBoxModule,
        CodeHighlighterModule
    ],
    declarations: [
        ScheduleDemo,
        ScheduleSelectedDemo,
    ],
    providers: [],
    exports: []
})
export class ScheduleDemoModule { }
