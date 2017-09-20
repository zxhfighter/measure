/**
 * @file tabset component
 * @author wangfengjiao(wangfengjiao01@baidu.com)
 */

import {
    NgModule,
    Component,
    OnInit,
    Input
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIControl} from '../control';
const prefix = UIControl.uiPrefix;

@Component({
    selector: `${prefix}-tab`,
    templateUrl: './tab.html',
    styleUrls: ['./tab.less'],
    exportAs: 'UITab'
})
export class UITab implements OnInit {
  @Input() title: string;
  active = false;
  name: string;

  constructor() { }

  ngOnInit() { }
}


