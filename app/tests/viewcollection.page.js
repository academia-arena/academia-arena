import { Selector } from 'testcafe';

class ViewCollectionPage {
  constructor() {
    this.pageId = '#view-collection-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.navigateTo('http://localhost:3000/view-collection'); // replace with your actual url
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const viewCollectionPage = new ViewCollectionPage();
