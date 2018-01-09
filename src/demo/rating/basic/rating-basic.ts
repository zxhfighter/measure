import { Component } from '@angular/core';

@Component({
    selector: 'demo-rating-basic',
    templateUrl: './rating-basic.html',
    styleUrls: ['./rating-basic.less']
})
export class RatingBasicDemo {
    ratingValue = 4;

    tooltipFunc(i) {
        const map = {
            1: '太失败了',
            2: '不太行',
            3: '中规中矩',
            4: '还不错哦',
            5: '墙裂推荐'
        };

        return map[i];
    }
}
