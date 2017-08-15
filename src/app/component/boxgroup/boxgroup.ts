/**
 * @file button component
 * @author zxhfighter(369749456@qq.com)
 */

import {NgModule, Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UICheckboxModule} from '../checkbox';
import {BaseItem} from '../common/interface';
import {UIControl} from '../control';
const prefix = UIControl.uiPrefix;

@Component({
    selector: `${prefix}-boxgroup`,
    template: `
        <div class="${prefix}-control ${prefix}-boxgroup">
            <ng-container *ngIf="type === 'checkbox'">
                <ui-checkbox 
                    *ngFor="let item of datasource" 
                    label="{{item.name}}"
                    value="{{item.value}}"
                    [checked]="item.checked">
                </ui-checkbox>
            </ng-container>

            <ng-container *ngIf="type === 'radio'">
                <div *ngFor="let item of datasource">
                    {{ item.name }}
                </div>
            </ng-container>
        </div>
    `
})
export class UIBoxGroup extends UIControl {

    @Input() type: 'radio'|'checkbox' = 'radio';
    @Input() datasource: BaseItem[] = [];
}

@NgModule({
    imports: [CommonModule, UICheckboxModule],
    declarations: [UIBoxGroup],
    exports: [UIBoxGroup]
})
export class UIBoxGroupModule {}
