import { Component } from '@angular/core';

@Component({
    selector: 'demo-input-theme',
    templateUrl: './input-theme.html',
    styleUrls: ['./input-theme.less']
})

export class InputThemeDemo {
    isDisabled = false;
    onFocus(ipt) {
        ipt.placeholder = '';
    }
}
