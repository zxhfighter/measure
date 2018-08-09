import { browser } from 'protractor';

describe('hello, protractor', () => {
    describe('index', () => {
        browser.get('/');

        it('should have a title', () => {
            expect<any>(browser.getTitle()).toBe('One Design E2E Tests');
        });
    });
});
