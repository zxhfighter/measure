import {
    Component, 
    OnInit, 
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'demo-search-box-suggest',
    templateUrl: './search-box-suggest.html',
    styleUrls: ['./search-box-suggest.less'],
})
export class SearchBoxSuggestDemo {

    suggestionValue = ['qwe', 'asd', 'zxc'];

    search(value) {
        console.log(value);
    }

    searchSuggestion(value) {
        console.log(value);
        this.suggestionValue = ['poi', 'hgf', 'gyuywr'];
    }
}
