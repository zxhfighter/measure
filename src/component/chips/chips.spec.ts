import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ChipsModule } from './index';
import { ButtonModule, ButtonComponent } from '../button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('nb-accordion', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ChipsTestComponent],
            imports: [ChipsModule, BrowserAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    it('should have an opening panel', () => {
        // const fixture = TestBed.createComponent(ChipsTestComponent);
        // fixture.detectChanges();

        // const rootElement = fixture.nativeElement;
        // const panels = getPanels(rootElement);

        // const result = panels.find(panel => panel.classList.contains('nb-accordion-panel-active'));
        // expect(result).not.toBeUndefined();
    });
});

@Component({
    selector: 'nb-chips-test',
    template: '<chips [value]=value></chips>'
})

class ChipsTestComponent {
    collapsible: boolean = true;

    hoverable: boolean = true;

    value = ['one', 'two'];
}
