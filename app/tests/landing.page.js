import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.navigateTo('http://localhost:3000/'); // replace with your actual url
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const landingPage = new LandingPage();
