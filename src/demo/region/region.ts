import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

import {REGIONS_BRAND} from './region.data';
import {deepClone} from '../../component/util/clone';

@Component({
    selector: 'demo-region',
    templateUrl: './region.html',
    styleUrls: ['./region.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoRegion implements OnInit {

    regionSource = REGIONS_BRAND;
    regionSource1 = deepClone(REGIONS_BRAND);
    regionSource2 = deepClone(REGIONS_BRAND);
    regionSource3 = deepClone(REGIONS_BRAND);
    regionSource4 = deepClone(REGIONS_BRAND);

    regionValue = [378, 379, 3, 1002, 34, 35, 36];

    constructor() {

    }

    ngOnInit() {

    }
}
