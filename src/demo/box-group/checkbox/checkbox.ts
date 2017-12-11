import { Input, Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'demo-checkbox',
    templateUrl: './checkbox.html',
    styleUrls: ['./checkbox.less'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxDemo implements OnInit {
    allChecked = false;
    intermediate = false;
    appleChecked = false;
    bananaChecked = true;
    orangeChecked = false;

    onToggleAll(checked: boolean) {
        this.appleChecked = checked;
        this.bananaChecked = checked;
        this.orangeChecked = checked;
    }

    onToggleBox(key: string, checked: boolean) {
        this[key] = checked;
        this.checkParent();
    }

    ngOnInit() {
        this.checkParent();
    }

    checkParent() {
        const all = this.appleChecked && this.bananaChecked && this.orangeChecked;
        const none = this.appleChecked || this.bananaChecked || this.orangeChecked;

        if (all) {
            this.allChecked = true;
            this.intermediate = false;
        }
        else if (!none) {
            this.allChecked = false;
            this.intermediate = false;
        }
        else {
            this.allChecked = false;
            this.intermediate = true;
        }
    }
}
