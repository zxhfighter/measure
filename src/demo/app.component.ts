import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import '../asset/less/demo.less';

@Component({
    selector: 'nb-app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    isDocs = false;

    constructor(private router: Router) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.isDocs = event.url.indexOf('/docs') !== -1 || event.url.indexOf('/icons') !== -1;
            }
        });
    }
}
