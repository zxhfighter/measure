import {
    Component
} from '@angular/core';

@Component({
    selector: 'demo-search-box-basic',
    templateUrl: './search-box-basic.html',
    styleUrls: ['./search-box-basic.less'],
    preserveWhitespaces: false
})

export class SearchBoxBasicDemo {

    searchValue = 'qazwsx';

    search(value) {
        console.log(value);
    }
}
