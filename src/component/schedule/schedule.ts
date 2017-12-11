import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
    selector: 'nb-schedule',
    templateUrl: './schedule.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-schedule'
    },
    exportAs: 'nbSchedule'
})
export class ScheduleComponent implements OnInit {
    schedules;
    layerTime;
    weekSelect;
    startpoint;
    flag = false;
    week = ['一', '二', '三', '四', '五', '六', '日'];
    hour = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', 
        '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', 
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    hours = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', 
        '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', 
        '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
    hourLabel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 
        18, 19, 20, 21, 22, 23, 24];
    constructor() {
        this.schedules = Array(168).fill(0);
        this.weekSelect = Array(7).fill(0);
        this.layerTime = Array(168).fill(0);
    }

    ngOnInit() {

    }
    select(i, j) {
        this.schedules[i * 24 + j] = (this.schedules[i * 24 + j] + 1) % 2;
        this.topTimeChange();

        let sum = 0;
        for (let k = i * 24; k < (i + 1) * 24; k++) {
            sum = sum + this.schedules[k];
        }
        if (sum === 0) {
            this.weekSelect[i] = 0;
        } else if (sum === 24) {
            this.weekSelect[i] = 2;
        } else {
            this.weekSelect[i] = 1;
        }
    }
    checkDay(j) {
        this.weekSelect[j] = this.weekSelect[j] > 0 ? 0 : 2;

        let value = parseInt(this.weekSelect[j] / 2 + '');
        for (let i = j * 24; i < (j + 1) * 24; i++) {
            this.schedules[i] = value;
        }
        // this.topTimeChange();
    }
    showLabel(i, j) {
        let value = this.layerTime[i*24 + j];
        if ( value < 3) {
            return '';
        } else if (value === 24) {
            return '全天';
        } else {
            let index = Math.floor(value/2);
            let tmp = (value + 1) % 2;
            let label = this.hours[j - index + tmp] + '-' + this.hours[j + index + 1];
            return label;
            // return value;
        }
        // console.log(index, time); 
    }
    topTimeChange() {
        this.layerTime = [];
        let colspan = 0;
        // for (let i = 0; i < this.schedules.length; i++) {
        //     if (this.schedules[i] === 0 || (i + 1) % 24 === 0) {
        //         this.layerTime.push(0);
        //         colspan = 0;
        //     } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 0) {
        //         colspan ++;
        //         this.layerTime.push(colspan);
        //     } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 1) {
        //         this.layerTime.push(0);
        //         colspan ++;
        //     }
        // }
        for (let i = 0; i < this.schedules.length; i++) {
            if (this.schedules[i] === 0) {
                this.layerTime.push(0);
                colspan = 0;
            } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 0) {
                colspan ++;
                let index = this.layerTime.length - (Math.floor(colspan / 2));
                this.layerTime[index] = colspan;
                this.layerTime.push(0);
            } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 1) {
                this.layerTime.push(0);
                colspan ++;
            }
        }
    }
    mouseup(i, j) {
        this.flag = false;
    }
    mousedown(i, j) {
        this.startpoint = [i, j];
        this.flag = true;
        this.preSelect(i, j);
    }
    mouseover(i, j) {
        if (this.flag === true) {
            // console.log('mouseover');
            // let observable = Observable.fromEvent(event.target, 'mouseover')
            // .debounceTime(10)
            // .subscribe(() => this.preSelect(i, j));
            this.preSelect(i, j)
        }
    }
    mouseout(i, j) {
        if (this.flag === true) {
            this.preSelect(i, j);
        }
    }
    preSelect(i, j) {
        let x1 = this.startpoint[0] < i ? this.startpoint[0] : i;
        let x2 = this.startpoint[0] > i ? this.startpoint[0] : i;
        let y1 = this.startpoint[1] < j ? this.startpoint[1] : j;
        let y2 = this.startpoint[1] > j ? this.startpoint[1] : j;
        for (let p = x1; p <= x2; p++) {
            for (let q = y1; q <= y2; q++) {
                this.select(p, q);
            }
        }
    }
}
