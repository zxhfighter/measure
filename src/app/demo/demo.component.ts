import {
    Component, Input, Output, EventEmitter,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';

import {Router, NavigationEnd} from '@angular/router';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoComponent implements OnInit {
    name = 'ComponentName';
    isDocs = false;
    constructor(private router: Router) {
        
    }

    ngOnInit() {
        this.router.events.subscribe(
            val => {
                if (val instanceof NavigationEnd) {
                    this.isDocs = val.urlAfterRedirects.indexOf('/demo/docs') > -1;
                }
            }
        )
    }
}
