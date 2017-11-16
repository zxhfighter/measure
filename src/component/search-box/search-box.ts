import {
    Component, Input, Output, EventEmitter, OnInit, 
    ViewEncapsulation, ChangeDetectionStrategy, ElementRef
} from '@angular/core';
import { OnChange } from '../core/decorators';

/** default search-box theme types */
export type SEARCH_TYPE = 'ico' | 'btn' | string;

/** default search-box is not suggest search */
export type IS_SUGGESTION = 'true' | 'false';

@Component({
    selector: 'nb-search-box',
    templateUrl: './search-box.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-search-box',
        '[class.nb-search-box-disabled]': 'disabled',
        '[class.nb-search-box-ico]': 'type == "ico"',
        '[class.nb-search-box-btn]': 'type == "btn"'
    }
})
export class SearchBoxComponent implements OnInit {

    /** search-box type: either 'ico' or 'btn' */
    @OnChange()
    @Input() type: SEARCH_TYPE = 'ico';

    /** Whether the search-box is suggest search: either true or false */
    @OnChange()
    @Input() isSuggestion: IS_SUGGESTION = 'false';

    /** search-box default placeholder */
    @Input() placeholder: string = '按关键词搜索';

    /** Whether the search-box is disabled  */
    @OnChange(true)
    @Input() disabled = false;

    /** search-box value */
    @OnChange()
    @Input() searchValue: string = '';

    /** search event */
    @OnChange()
    @Output() onSearch = new EventEmitter();

    /** search-box suggest search value */
    @OnChange()
    @Input() suggestionValue: Array<string> = [];

    /** suggest search event */
    @OnChange()
    @Output() onSearchSuggestion = new EventEmitter();

    /** init suggest search region is not open */
    private isOpen: boolean = false;

    constructor(
        private el: ElementRef
    ) { }

    ngOnInit() {
        if (this.isSuggestion !== 'false') {
            window.addEventListener('scroll', () => {
                this.positionSuggestionLayer(this);
            });
            window.addEventListener('resize', () => {
                this.positionSuggestionLayer(this);
            });
        }
    }

    /** position suggestion layer */
    positionSuggestionLayer(self) {
        let elLayer = self.el.nativeElement.getElementsByClassName('nb-search-box-suggestion-layer');
        if (elLayer.length) {
            /**
             * 156 = 36 + 110 + 10 
             * @docs-private
             */
            let pos = window.scrollY + window.innerHeight - self.el.nativeElement.offsetTop - 156 > 0
                ? 'bottom' : 'top';
            elLayer[0].className = 'nb-search-box-suggestion-layer' + ' ' + 'nb-search-box-suggestion-layer-' + pos;
        }   
    }

    /** listen keyword input in search-box */
    onInputValue() {
        if (this.isSuggestion !== 'false' && this.searchValue) {
            this.positionSuggestionLayer(this);
            this.onSearchSuggestion.emit(this.searchValue);
            this.isOpen = true;
        }
    }

    /** clear keyword in search-box */
    clearSearch() {
        this.isOpen = false;
        this.searchValue = '';
    }

    /** search use keyword event */
    search() {
        this.isOpen = false;
        this.onSearch.emit(this.searchValue);
    }

    /** click select suggest search value */
    selectSuggestionValue(suggestionItem) {
        this.searchValue = suggestionItem;
        this.isOpen = false;
    }
}
