import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { AccordionModule } from './index';
import { ButtonModule, ButtonComponent } from '../button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

function getPanels(element: HTMLElement): HTMLDivElement[] {
    return <HTMLDivElement[]>Array.from(element.querySelectorAll('.nb-accordion-panel'));
}

function getPanelsContent(element: HTMLElement): HTMLDivElement[] {
    return <HTMLDivElement[]>Array.from(element.querySelectorAll('.nb-accordion-content'));
}

function getPanelsHeaders(element: HTMLElement): HTMLDivElement[] {
    return <HTMLDivElement[]>Array.from(element.querySelectorAll('.nb-accordion-header'));
}

function expectOpenPanels(nativeEl: HTMLElement, openPanelsDef: boolean[]) {
    const panels = getPanels(nativeEl);
    expect(panels.length).toBe(openPanelsDef.length);

    const result = panels.map(panel => panel.classList.contains('nb-accordion-panel-active'));
    expect(result).toEqual(openPanelsDef);
}

describe('nb-accordion', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccordionTestComponent],
            imports: [AccordionModule, BrowserAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    it('should have an opening panel', () => {
        const fixture = TestBed.createComponent(AccordionTestComponent);
        fixture.detectChanges();

        const rootElement = fixture.nativeElement;
        const panels = getPanels(rootElement);

        const result = panels.find(panel => panel.classList.contains('nb-accordion-panel-active'));
        expect(result).not.toBeUndefined();
    });

    it('should allow only one panel to be active', () => {
        const fixture = TestBed.createComponent(AccordionTestComponent);
        fixture.detectChanges();

        const rootElement = fixture.nativeElement;
        const panels = getPanels(rootElement);
        const firstAccordionHeaderElement = <HTMLElement>panels[0].children[0];
        const seconedAccordionHeaderElement = <HTMLElement>panels[1].children[0];
        const thirdAccordionHeaderElement = <HTMLElement>panels[2].children[0];

        firstAccordionHeaderElement.click();
        fixture.detectChanges();
        expectOpenPanels(rootElement, [true, false, false]);

        seconedAccordionHeaderElement.click();
        fixture.detectChanges();
        expectOpenPanels(rootElement, [false, true, false]);

        thirdAccordionHeaderElement.click();
        fixture.detectChanges();
        expectOpenPanels(rootElement, [false, false, true]);
    });

    it('should toggle panels independently', () => {
        const html = `
            <nb-accordion [panels]="panels" [collapsible]="collapsible"></nb-accordion>
        `;
        TestBed.overrideComponent(AccordionTestComponent, {set: {template: html}});
        const fixture = TestBed.createComponent(AccordionTestComponent);
        fixture.detectChanges();

        const rootElement = fixture.nativeElement;
        const panels = getPanels(rootElement);

        panels.forEach(panel => {
            const isActiveBeforeClick = panel.classList.contains('nb-accordion-panel-active');
            panel.click();
            fixture.detectChanges();
            const isActiveAfterClick = panel.classList.contains('nb-accordion-panel-active');

            if (isActiveBeforeClick) {
                expect(isActiveAfterClick).toBe(false);
            }
            else {
                expect(isActiveAfterClick).toBe(true);
            }
        });
    });

    it('should have the appropriate content', () => {
        const fixture = TestBed.createComponent(AccordionTestComponent);
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        const originalContent = fixture.componentInstance.panels;
        fixture.detectChanges();

        const contents = getPanelsContent(compiled);
        expect(contents.length).not.toBe(0);

        contents.forEach((content: HTMLElement, idx: number) => {
            expect(content!.textContent!.trim()).toBe(originalContent[idx].content);
        });
    });

});

@Component({
    selector: 'nb-accordion-test',
    template: '<nb-accordion [panels]="panels"></nb-accordion>'
})

class AccordionTestComponent {
    collapsible: boolean = true;

    hoverable: boolean = true;

    panels = [
        { header: 'Panel 1', content: 'foo' },
        { header: 'Panel 2', content: 'bar' },
        { header: 'Panel 3', content: 'baz' }
    ];
}
