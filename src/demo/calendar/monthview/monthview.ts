import { Component } from '@angular/core';
import { addDays, subDays, isWithinInterval } from 'date-fns';

@Component({
    selector: 'demo-monthview',
    templateUrl: './monthview.html',
    styleUrls: ['./monthview.less']
})
export class MonthViewDemo {
    startDate = new Date();
    endDate = addDays(new Date(), 7);
    selectedDate: Date = new Date('2017-12-31');

    /**
     * 日期 disabled 策略：最近3个整月，从前天开始往前才有数据
     *
     * @param {Date} date 判断日期
     * @return {boolean}
     */
    disabledStrategy(date: Date) {
        // 1个月前
        const startDate = subDays(new Date(), 7);

        // 今天（从前天开始往前才有数据，因此减去2天）
        const endDate = subDays(new Date(), 2);

        // 带判断日期
        const currDate = date;

        // 如果不再这个区间，disabled 掉
        return !isWithinInterval(currDate, {start: startDate, end: endDate});
    }
}
