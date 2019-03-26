import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
    currentIndex = 0;
    suggestionList: { 'text': string, 'routerLink': string, 'routerLinkActive': string, 'class': string, currentRouter: boolean }[] = [];
    constructor(private router: Router) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                for (let i = 0; i < this.routerList.length; i++) {
                    if (this.routerList[i].routerLink === event.url) {
                        this.routerList[i].currentRouter = true;
                        this.routerList[this.currentIndex].currentRouter = false;
                        this.currentIndex = i;
                        break;
                    }
                }

            }
        });
    }
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
                    return suggestion.routerLink && suggestion.text && suggestion.text.match(key);
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
