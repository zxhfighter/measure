import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'demo-tabset',
    templateUrl: './tabset.demo.html',
})
export class TabsetDemo implements OnInit {

    tabs: any;

    constructor() { }

    ngOnInit() {
        this.tabs = [
            { title: 'About', content: 'This is the About tab' },
            { title: 'Blog', content: 'This is our blog' },
            { title: 'Contact us', content: 'Contact us here' },
        ];
    }
}

