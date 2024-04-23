import { Selector } from 'testcafe';

class WishlistPage {
  constructor() {
    this.pageId = '#wishlist-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.navigateTo('http://localhost:3000/wishlist'); // replace with your actual url
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const wishlistPage = new WishlistPage();
