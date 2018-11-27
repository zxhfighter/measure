import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'demo-monthview',
    templateUrl: './monthview.html',
    styleUrls: ['./monthview.less']
})
export class MonthViewDemo {
    startDate = new Date();
    endDate = moment().add(7, 'd').toDate();
    selectedDate: Date = moment('2017-12-31').toDate();

    /**
     * 日期 disabled 策略：最近3个整月，从前天开始往前才有数据
     *
     * @param {Date} date 判断日期
     * @return {boolean}
     */
    disabledStrategy(date: Date) {
        // 1个月前
        const startDate = moment().subtract(7, 'days');

        // 今天（从前天开始往前才有数据，因此减去2天）
        const endDate = moment().subtract(2, 'days');

        // 带判断日期
        const currDate = moment(date);

        // 如果不再这个区间，disabled 掉
        return !currDate.isBetween(startDate, endDate);
    }
}
