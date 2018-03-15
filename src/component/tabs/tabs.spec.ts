import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPositionService } from '../overlay/overlay-position.service';
import { ViewportRuler } from '../overlay/scroll-strategy';
import { Component } from '@angular/core';
import { TabsModule } from './index';

function getTabTitles(nativeEl: HTMLElement) {
    return nativeEl.querySelectorAll('.nb-tab-header');
}

function getTabContents(nativeEl: HTMLElement) {
    return nativeEl.querySelectorAll('.nb-tab');
}

function expectTabs(nativeEl: HTMLElement, active: boolean[], disabled?: boolean[]) {
    const tabTitles = getTabTitles(nativeEl);
    const tabContents = getTabContents(nativeEl);
    const anyTabsActive = active.reduce((prev, curr) => prev || curr, false);

    expect(tabTitles.length).toBe(active.length);

    if (disabled) {
        expect(disabled.length).toBe(active.length);
    } else {
        // tabs are not disabled by default
        disabled = new Array(active.length);
    }

    for (let i = 0; i < active.length; i++) {
        if (active[i]) {
            const isActive = tabTitles[i].classList.contains('active');
            expect(isActive).toBe(true);
        } else {
            const isActive = tabTitles[i].classList.contains('active');
            expect(isActive).toBe(false);
        }

        if (disabled[i]) {
            const isActive = tabTitles[i].classList.contains('disabled');
            expect(isActive).toBe(true);
        } else {
            const isActive = tabTitles[i].classList.contains('disabled');
            expect(isActive).toBe(false);
        }
    }
}

describe('nb-tabs', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TabsTestComponent],
            imports: [TabsModule, BrowserAnimationsModule],
            providers: [OverlayPositionService, ViewportRuler],
        }).compileComponents();
    });

    // it('should render tabs and select first tab as active by default', () => {
    //     const fixture = TestBed.createComponent(TabsTestComponent);
    //     fixture.detectChanges();

    //     const tabTitles = getTabTitles(fixture.nativeElement);
    //     const tabContents = getTabContents(fixture.nativeElement);

    //     expect(tabTitles[0].textContent).toMatch(/选中状态/);
    //     expect(tabTitles[1].textContent).toMatch(/默认状态/);
    //     expect(tabTitles[2].textContent).toMatch(/悬浮状态/);
    //     expect(tabTitles[3].textContent).toMatch(/按下状态/);
    //     expect(tabTitles[4].textContent).toMatch(/不可点击/);

    //     expect(tabContents.length).toBe(5);
    //     expect(tabContents[0].textContent).toMatch(/选中状态/);

    //     expectTabs(fixture.nativeElement, [true, false, false, false, false], [false, false, false, false, true]);
    // });

    it('should allow tip in tab titles', () => {
        const html = `
            <nb-tabs underline>
                <nb-tab title="选中状态"></nb-tab>
                <nb-tab title="默认状态" tipable></nb-tab>
                <nb-tab title="悬浮状态"></nb-tab>
                <nb-tab title="按下状态"></nb-tab>
                <nb-tab title="不可点击" disabled></nb-tab>
                <div class="tip-content">
                    <span>高级带图标多行提示</span>
                    <p>永和九年，岁在癸丑，暮春之初，会于会稽山阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂《兰亭集序》</p>
                </div>
            </nb-tabs>
        `;

        TestBed.overrideComponent(TabsTestComponent, {set: {template: html}});
        const fixture = TestBed.createComponent(TabsTestComponent);
        fixture.detectChanges();

        const tabTitles = getTabTitles(fixture.nativeElement);
        expect(tabTitles[1].innerHTML).toMatch(/<i.*<\/i>/);
    });


    it('should not crash for empty tabs', () => {
        const html = `<nb-tabs underline></nb-tabs>`;

        TestBed.overrideComponent(TabsTestComponent, {set: {template: html}});
        const fixture = TestBed.createComponent(TabsTestComponent);
        fixture.detectChanges();

        expectTabs(fixture.nativeElement, []);
    });

    it('should mark the requested tab as active', () => {
        const html = `<nb-tabs>
                <nb-tab title="选中状态"></nb-tab>
                <nb-tab title="默认状态"></nb-tab>
                <nb-tab title="悬浮状态" active></nb-tab>
                <nb-tab title="按下状态"></nb-tab>
            </nb-tabs>
        `;

        TestBed.overrideComponent(TabsTestComponent, {set: {template: html}});
        const fixture = TestBed.createComponent(TabsTestComponent);
        fixture.detectChanges();

        expectTabs(fixture.nativeElement, [false, false, true, false]);
    });

    it('should change active tab on tab title click except for disabled', () => {
        const fixture = TestBed.createComponent(TabsTestComponent);
        fixture.detectChanges();

        const tabTitles = getTabTitles(fixture.nativeElement);
        const tabContents = getTabContents(fixture.nativeElement);

        (<HTMLElement>tabTitles[1]).click();
        fixture.detectChanges();
        expectTabs(fixture.nativeElement, [false, true, false, false, false], [false, false, false, false, true]);

        // click disabled tabTitle
        (<HTMLElement>tabTitles[4]).click();
        fixture.detectChanges();
        expectTabs(fixture.nativeElement, [false, true, false, false, false], [false, false, false, false, true]);
    });

    it('should emit tab change event when switching tabs', () => {
        const html = `<nb-tabs (change)="onChange($event)">
                <nb-tab title="选中状态" active></nb-tab>
                <nb-tab title="默认状态"></nb-tab>
                <nb-tab title="悬浮状态">悬浮状态</nb-tab>
                <nb-tab title="按下状态">按下状态</nb-tab>
                <nb-tab title="不可点击" disabled>不可点击</nb-tab>
            </nb-tabs>
        `;
        TestBed.overrideComponent(TabsTestComponent, {set: {template: html}});
        const fixture = TestBed.createComponent(TabsTestComponent);
        fixture.detectChanges();

        const tabTitles = getTabTitles(fixture.nativeElement);

        spyOn(fixture.componentInstance, 'onChange');

        // should not emit tab change event when selecting currently active and disabled tabs
        (<HTMLElement>tabTitles[0]).click();
        fixture.detectChanges();
        expect(fixture.componentInstance.onChange).not.toHaveBeenCalled();

        (<HTMLElement>tabTitles[4]).click();
        fixture.detectChanges();
        expect(fixture.componentInstance.onChange).not.toHaveBeenCalled();

        // Select the second tab -> change event
        (<HTMLElement>tabTitles[1]).click();
        fixture.detectChanges();
        expect(fixture.componentInstance.onChange)
            .toHaveBeenCalledWith(jasmine.objectContaining({ activeIndex: 1}));

        // Select the first tab again -> change event
        (<HTMLElement>tabTitles[0]).click();
        fixture.detectChanges();
        expect(fixture.componentInstance.onChange)
            .toHaveBeenCalledWith(jasmine.objectContaining({ activeIndex: 0}));
    });

});

@Component({
    selector: 'nb-tabs-test',
    template: `
        <nb-tabs>
            <nb-tab title="选中状态" active>选中状态</nb-tab>
            <nb-tab title="默认状态">默认状态</nb-tab>
            <nb-tab title="悬浮状态">悬浮状态</nb-tab>
            <nb-tab title="按下状态">按下状态</nb-tab>
            <nb-tab title="不可点击" disabled>不可点击</nb-tab>
        </nb-tabs>
        `
})

class TabsTestComponent {

    onChange = () => {};
}
