import { Component } from '@angular/core';

@Component({
    selector: 'demo-search-box',
    templateUrl: './search-box.html',
    styleUrls: ['./search-box.less'],
    preserveWhitespaces: false
})
export class SearchBoxDemo {

    public searchValue = 'qazwsx';
    public suggestionValue = ['qwe', 'asd', 'zxc'];

    search(value) {
        console.log(value);
    }

    searchSuggestion(value) {
        console.log(value);
        this.suggestionValue = ['poi', 'hgf', 'gyuywr'];
    }
    // basic sources
    tsCodeBasic: string = require('!!raw-loader!./basic/search-box-basic.ts');
    htmlCodeBasic: string = require('!!raw-loader!./basic/search-box-basic.html');
    lessCodeBasic: string = require('!!raw-loader!./basic/search-box-basic.less');

    // suggest sources
    tsCodeSuggest: string = require('!!raw-loader!./suggest/search-box-suggest.ts');
    htmlCodeSuggest: string = require('!!raw-loader!./suggest/search-box-suggest.html');
    lessCodeSuggest: string = require('!!raw-loader!./suggest/search-box-suggest.less');
}
