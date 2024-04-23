import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { viewCollectionPage } from './viewcollection.page';
import { wishlistPage } from './wishlist.page';
import { marketplacePage } from './marketplace.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup page then signout work', async (testController) => {
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, 'password');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
test('Test that user can view collection page after sign in', async (testController) => {
  // Sign in
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);

  // Navigate to view collection page
  await viewCollectionPage.isDisplayed(testController);

  // Sign out
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user can view the wishlist page after sign in', async (testController) => {
  // Sign in
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);

  // Navigate to view collection page
  await wishlistPage.isDisplayed(testController);

  // Sign out
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user can view the marketplace page after sign in', async (testController) => {
  // Sign in
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);

  // Navigate to view collection page
  await marketplacePage.isDisplayed(testController);

  // Sign out
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
