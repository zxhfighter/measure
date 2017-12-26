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

    menuTree: any = {
        title: '组件列表',
        expanded: true,
        root: '全部组件',
        tree: [
            {
                id: 1,
                name: '输入组件',
                selectable: false,
                children: [
                    {
                        id: 1000,
                        name: 'input',
                        selectable: true
                    },
                    {
                        id: 1001,
                        name: 'textarea',
                        selectable: true
                    }
                ]
            },
            {
                id: 2,
                name: '按钮组件',
                selectable: false,
                children: [
                    {
                        id: 1000,
                        name: 'button',
                        selectable: true
                    },
                    {
                        id: 1001,
                        name: 'button-group',
                        selectable: true
                    }
                ]
            }
        ]
    };

    constructor(private router: Router) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.isDocs = event.url.indexOf('/docs') !== -1 || event.url.indexOf('/icons') !== -1;
            }
        });
    }

    onNavi(event: any) {
        const url = `/components/${event.name}`;
        this.router.navigate([url]);
    }
}
