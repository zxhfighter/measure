import { Component } from '@angular/core';

@Component({
    selector: 'demo-rating-tooltip',
    templateUrl: './rating-tooltip.html',
    styleUrls: ['./rating-tooltip.less']
})
export class RatingTooltipDemo {
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
