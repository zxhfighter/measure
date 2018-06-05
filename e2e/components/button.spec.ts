import { browser, by, element, ElementFinder } from 'protractor';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const WIDTH = 1024;
const HEIGHT = 768;
const OUTPUT_DIR = './dist/snapshots/';

function takeSnapshot(id?: string) {
    browser.takeScreenshot().then(png => storeSnapshot(png, id));
}

function storeSnapshot(png: any, id?: string) {
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, '744');
    }
    else {
        const fullPath = join(OUTPUT_DIR, (id ? id : +new Date()) + '.png');
        writeFileSync(fullPath, png, {encoding: 'base64' });
    }
}

describe('button component', () => {
    let clickButton: ElementFinder;
    let countSpan: ElementFinder;
    let disabledButton: ElementFinder;

    beforeEach(() => {
        browser.manage().window().setSize(WIDTH, HEIGHT);
        browser.get('/#/button');
        clickButton = element(by.id('test-button'));
        countSpan = element(by.id('counter'));
        disabledButton = element(by.id('disabled-button'));
    });

    it('should have a primary theme and default size', () => {
        expect(clickButton.getAttribute('class')).toContain('nb-button-theme-primary');
    });

    it('should add one when click button', async () => {
        expect(await countSpan.getText()).toEqual('0');

        clickButton.click();
        expect(await countSpan.getText()).toEqual('1');

        disabledButton.click();
        clickButton.click();
        expect(await countSpan.getText()).toEqual('1');
        takeSnapshot('button-disabled');

        disabledButton.click();
        clickButton.click();
        expect(await countSpan.getText()).toEqual('2');
        takeSnapshot('button-enabled');
    });
});
