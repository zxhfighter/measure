import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ButtonModule } from './button.module';

@Component({
    template: '<button nb-button #button> OK </button>'
})
class ButtonTestComponent {
    @ViewChild('button' {static: false}) button;
}

describe('nb-button', () => {

    let fixture: ComponentFixture<ButtonTestComponent>;
    let component: ButtonTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ButtonTestComponent ],
            imports: [ ButtonModule ]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonTestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should have default theme and default size', () => {
        const theme = component.button.theme;
        const size = component.button.size;
        expect(theme).toBe('primary');
        expect(size).toBe('default');
    });
});
