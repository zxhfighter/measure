import {
    Component, OnInit, Input, ContentChildren, QueryList, Optional
} from '@angular/core';

@Component({
    selector: 'x-app',
    template: `
        <x-parent [name]="aaa">
            <x-child name="childName1"></x-child>
            <x-child name="childName2"></x-child>
        </x-parent>
    `
})
export class DemoXXX {
    aaa = 'def';
}