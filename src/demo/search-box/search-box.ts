import {
    Component, OnInit, ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-search-box',
    templateUrl: './search-box.html',
    styleUrls: ['./search-box.less'],
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DemoSearchBox implements OnInit {

    public searchValue = 'qazwsx';
    public suggestionValue = ['qwe', 'asd', 'zxc'];

    constructor() {

    }

    ngOnInit() {

    }

    search(value) {
        console.log(value);
    }

    searchSuggestion(value) {
        console.log(value);
        this.suggestionValue = ['poi', 'hgf', 'gyuywr'];
    }
}
