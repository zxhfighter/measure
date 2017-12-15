import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {SelectConfig} from "../select/select.config";

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
    hours;
    selectData: SelectConfig[] = [
        {
            label: '全周',
            value: 7
        },
        {
            label: '工作日',
            value: 5
        },
        {
            label: '周末',
            value: 2
        }
    ];
    constructor() {
        this.schedules = Array(169).fill(0);
        this.weekSelect = Array(7).fill(0);
        this.layerTime = Array(168).fill(0);
        this.hours = Array.apply(Array, Array(25)).map((v,k) => k);
    }
    ngOnInit() {

    }
    /**
     * set day
     *
     * @param {object} event - page change event
     * @docs-private
     */
    setDay(event) {
        let day = event.value;
        switch(day) {
            case 7: 
                this.schedules = Array(169).fill(1);
                break;
            case 5:
                this.schedules = Array(24*5).fill(1).concat(Array(24*2+1).fill(0));
                break;
            case 2:
                this.schedules = Array(24*5).fill(0).concat(Array(24*2+1).fill(1));
        } 
        this.topTimeChange();
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
        this.topTimeChange();
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
            let label = this.hours[j - index + tmp] + ':00-' + this.hours[j + index + 1] + ':00';
            return label;
        }
    }
    topTimeChange() {
        this.layerTime = [];
        let colspan = 0;
        for (let i = 0; i <= this.schedules.length + 1; i++) {
            if (this.schedules[i] === 0) {
                this.layerTime.push(0);
                colspan = 0;
            } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 0) {
                colspan ++;
                if (colspan >= 3) {
                    let index = this.layerTime.length - Math.floor(colspan / 2);
                    this.layerTime[index] = colspan;
                }
                this.layerTime.push(0);
                
            } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 1 && (i + 1) % 24 !== 0) {
                this.layerTime.push(0);
                colspan ++;
            } else if (this.schedules[i] === 1 && this.schedules[i + 1] === 1 && (i + 1) % 24 === 0) {
                colspan ++;
                let index = this.layerTime.length - (Math.floor(colspan / 2));
                this.layerTime[index] = colspan;
                this.layerTime.push(0);
                colspan = 0;
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
