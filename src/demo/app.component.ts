import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerList } from './app.config';
import '../asset/less/demo.less';
@Component({
    selector: 'nb-app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    @ViewChild('input') input: ElementRef;
    title = 'app';
    isOpen = false;
    routerList = routerList;

    value = '';
    suggestionList: { 'text': string; 'routerLink': string; 'routerLinkActive': string; 'class': string; }[];
    constructor(private router: Router) { }
    ngOnInit() {
        document.addEventListener('click', e => {
            e.stopPropagation();
            let value = e.target && e.target['classList'] && e.target['classList'].value;
            if (value.indexOf('search') === -1 && value.indexOf('suggestion-item') === -1) {
                this.isOpen = false;
            }
        });
    }
    search() {
        setTimeout(() => {
            let keyWord = this.input.nativeElement.value;
            if (!keyWord) {
                this.suggestionList = [];
            } else {
                let key = new RegExp(keyWord, 'i');
                this.suggestionList = this.routerList.filter(suggestion => {
                    return suggestion.text && suggestion.text.match(key);
                });
            }
        }, 0);
    }
    onFocus() {
        this.isOpen = true;
        this.search();
    }
    selectSuggestionValue(item) {
        this.router.navigate([item.routerLink]);
        this.isOpen = false;
    }
}
