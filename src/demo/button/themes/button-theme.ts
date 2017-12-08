import { Component } from '@angular/core';

@Component({
    selector: 'demo-button-theme',
    templateUrl: './button-theme.html',
    styleUrls: ['./button-theme.less']
})
export class ButtonThemeDemo {
    name = 'ComponentName';
    counter = 0;
    buttonText = 'xs height 28px';
    isDisabled = false;

    size = 'xs';

    onClick() {
        this.counter = this.counter + 1;
    }

    changeSize() {
        this.size = this.size === 'lg' ? 'xs' : 'lg';
    }

    changeText() {
        this.buttonText = 'xs height: ' + Math.floor(Math.random() * 100);
    }

    changeDisabled() {
        this.isDisabled = !this.isDisabled;
    }
}
