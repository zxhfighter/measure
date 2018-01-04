import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-tabs-content',
    templateUrl: './tabs-content.html',
    styleUrls: ['./tabs-content.less']
})
export class TabsContentDemo {

    tabsSelected: [
        { title: '第一项目', content: 'This is the About tab' },
        { title: '第二项目', content: 'This is our blog' },
        { title: '第三项目', content: 'Contact us here' },
        { title: '第四项目', content: 'Contact us here' },
        { title: '第五项目', content: 'Contact us here' }
    ];

    tabsDefault: [
        { title: '第一项目', content: 'This is the About tab' },
        { title: '第二项目', content: 'This is our blog', active: true },
        { title: '第三项目', content: 'Contact us here' },
        { title: '第四项目', content: 'Contact us here' },
        { title: '第五项目', content: 'Contact us here' }
    ];

    tabsHover: [
        { title: '第一项目', content: 'This is the About tab' },
        { title: '第二项目', content: 'This is our blog' },
        { title: '第三项目', content: 'Contact us here', active: true },
        { title: '第四项目', content: 'Contact us here' },
        { title: '第五项目', content: 'Contact us here' }
    ];

    tabsPress: [
        { title: '第一项目', content: 'This is the About tab' },
        { title: '第二项目', content: 'This is our blog' },
        { title: '第三项目', content: 'Contact us here' },
        { title: '第四项目', content: 'Contact us here', active: true },
        { title: '第五项目', content: 'Contact us here' }
    ];

    constructor() {
    }
}
