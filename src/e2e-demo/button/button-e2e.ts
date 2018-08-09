import {
    Component, OnInit
} from '@angular/core';

@Component({
    selector: 'demo-e2e-button',
    templateUrl: './button-e2e.html'
})
export class ButtonComponent implements OnInit {
    count = 0;
    isDisabled = false;

    constructor() {}

    ngOnInit() {}
}
