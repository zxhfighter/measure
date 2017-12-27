import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectorRef, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonModule, ButtonConfig } from './index';

class ButtonConfigStub extends ButtonConfig {
    constructor() {
        super();

        this.theme = 'primary';
    }
}

describe('Button', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ButtonModule.forRoot() ],
            declarations: [ TestAppDemo ]
        }).compileComponents();
    }));

    it('should apply class based on theme attribute', () => {
        let fixture = TestBed.createComponent(TestAppDemo);
        let testComponent = fixture.componentInstance;
        let buttonDebugElement = fixture.debugElement.query(By.css('button'));
        let aDebugElement = fixture.debugElement.query(By.css('a'));

        testComponent.buttonTheme = 'primary';
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('nb-button-primary')).toBe(true);
        expect(aDebugElement.nativeElement.classList.contains('nb-button-primary')).toBe(true);

        testComponent.buttonTheme = null;
        fixture.detectChanges();
        expect(buttonDebugElement.nativeElement.classList.contains('nb-button-default')).toBe(true);
        expect(aDebugElement.nativeElement.classList.contains('nb-button-default')).toBe(true);
    });
});

@Component({
    selector: 'nb-button-test',
    template: `
        <button nb-button [theme]="buttonTheme"> hello, world </button>
        <a nb-button> hello, world </a>
    `
})
class TestAppDemo {
    buttonTheme: string | null = '';
}
