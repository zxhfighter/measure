import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { ChipsModule } from './chips.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA, DebugElement, Component } from '@angular/core';
import { ChipsComponent } from '../index';
import { By } from '@angular/platform-browser';

@Component({
    template: '<nb-chips [value]=value></nb-chips>'
})
class ChipsTestComponent {
    value = ['one', 'two'];
}

describe('nb-chips', () => {
    let fixture: ComponentFixture<ChipsTestComponent>;
    let component: ChipsTestComponent;
    let de: Array<DebugElement>;
    let el0: HTMLElement;
    let el1: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ChipsTestComponent],
            imports: [ChipsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ChipsTestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        de = fixture.debugElement.queryAll(By.css('.nb-chips-label'));
        el0 = de[0].nativeElement;
        el1 = de[1].nativeElement;
    });

    it('should have default chips when value is not a empty array', () => {
        expect(el0.textContent!.trim()).toBe(component.value[0]);
        expect(el1.textContent!.trim()).toBe(component.value[1]);
    });
});
