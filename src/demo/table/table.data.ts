import { genBool, genNum, genStr } from '../util/random';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';

export function genTableData(len: number = genNum(100, 200)) {
    let data: any[] = [];

    for (let i = 0; i < len; i++) {
        const status = [0, 1, 2][genNum(0, 3)];
        const statusText = ['Auditing', 'Failed', 'Passed'][status];

        data.push({
            id: i,
            name: genStr(2, 6),
            status: status,
            statusText: statusText,
            phone: (genNum(10000000000, 18500000000) + '').slice(0, 11),
            school: ['Harvard', 'Stanford', 'Tsinghua', 'Peking'][genNum(0, 4)],
            height: genNum(150, 230),
            gender: ['male', 'female'][Math.random() > 0.5 ? 1 : 0],
            age: genNum(10, 60),
            weight: genNum(40, 100),
            company: ['Tsla', 'Apple', 'Google', 'AT&T'][genNum(0, 4)],
            country: ['China', 'US', 'Canada', 'Japan', 'Korea'][genNum(0, 5)],
            address: 'somewhere on earth #' + i + ' block',
            checked: i % 3 === 0
        });
    }
    return data;
}

export function getTableDataAsync() {
    const data = genTableData();
    return of(data).pipe(delay(3000));
}
