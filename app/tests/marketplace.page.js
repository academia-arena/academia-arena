import { Selector } from 'testcafe';

class MarketplacePage {
  constructor() {
    this.pageId = '#marketplace-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.navigateTo('http://localhost:3000/trade'); // replace with your actual url
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const marketplacePage = new MarketplacePage();
