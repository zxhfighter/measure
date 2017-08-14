/**
 * @file button component
 * @author zxhfighter(369749456@qq.com)
 */

import {NgModule, Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIControl} from '../control';

const prefix = UIControl.uiPrefix;

@Component({
    selector: `${prefix}-button`,
    template: `
        <div
            [ngClass]="computeClass()">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIButton extends UIControl {

    /** disabeld status */
    @Input() disabled = false;

    /** button type */
    @Input() type: 'primary'|'secondary'|'normal'|'grey' = 'normal';

    /** button size */
    @Input() size: 'sm'|'md'|'lg'|'auto' = 'auto';
    
    /**
     * compute button classes
     * 
     * @return {string[]} button classes
     */
    computeClass() {
        let classList = [`${prefix}-control`, `${prefix}-button`];
        
        // type class
        classList.push(`${prefix}-button-${this.type}`);

        // size class
        classList.push(`${prefix}-button-size-${this.size}`);

        // disable class
        if (this.disabled) {
            classList.push(`${prefix}-disabled`);
        }

        return classList;
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [UIButton],
    exports: [UIButton]
})
export class UIButtonModule {}
