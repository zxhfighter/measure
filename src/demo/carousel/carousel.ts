import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-carousel',
    templateUrl: './carousel.html',
    styleUrls: ['./carousel.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoCarousel implements OnInit {

    constructor() {

    }

    ngOnInit() {

    }
}
