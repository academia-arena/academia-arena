import { Selector } from 'testcafe';

class Marketplace {
  constructor() {
    this.pageId = '#marketplace-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController)
  {
    await testController.navigateTo('http://localhost:3000/marketplace');
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const marketplacePage = new Marketplace();