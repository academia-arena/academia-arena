import { Selector } from 'testcafe';

class PullPage {
  constructor() {
    this.pageId = '#card-pull-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.navigateTo('http://localhost:3000/pull'); // replace with your actual url
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const pullPage = new PullPage();
