import { browser, by, element } from 'protractor';

export class MeasurePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('m-root h1')).getText();
  }
}
