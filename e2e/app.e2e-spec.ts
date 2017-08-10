import { MeasurePage } from './app.po';

describe('measure App', () => {
  let page: MeasurePage;

  beforeEach(() => {
    page = new MeasurePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to m!!');
  });
});
