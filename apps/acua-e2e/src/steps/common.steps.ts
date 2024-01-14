import { Then, When } from '@cucumber/cucumber';
import { PlaywrightWorld } from '@gnuechtel/nx-cucumber';
import { expect } from 'playwright/test';
import { maskColor } from '../shared';

// Given + When
When(/^.* user visits the home page$/, async function (this: PlaywrightWorld) {
  await this.visit('/');
});

When(
  'the user is logged in as a(n) {word}',
  async function (this: PlaywrightWorld, role: string) {
    let expectedDisplayName: string;
    let email: string;
    const password = 'password';

    switch (role) {
      case 'admin':
        email = 'admin@mpfglaser.nl';
        break;
      case 'tenant':
        email = 'tenant@mpfglaser.nl';
        break;
      case 'user to delete':
        email = 'deleteme@mpfglaser.nl';
        break;
      default:
        throw new Error(`Unknown role: ${role}`);
    }

    switch (role) {
      case 'admin':
        expectedDisplayName = 'Admin';
        break;
      case 'tenant':
        expectedDisplayName = 'Tenant';
        break;
      case 'user to delete':
        expectedDisplayName = 'Delete me';
        break;
      default:
        throw new Error(`Unknown role: ${role}`);
    }

    await this.visit('/login');

    const emailInput = this.page.getByRole('textbox', { name: 'Email' });
    const passwordInput = this.page.getByRole('textbox', { name: 'Password' });

    await emailInput.fill(email);
    await passwordInput.fill(password);

    const loginButton = this.page.getByTestId('login-button');

    await loginButton.click();

    const displayName = this.page.getByTestId('navigation-display-name').nth(0);

    this.setScreenshotOptions({ mask: [displayName], maskColor }); // highlight display name

    await expect(displayName).toContainText(expectedDisplayName);
  }
);

Then(
  'the user is shown a toast with the message {string}',
  async function (this: PlaywrightWorld, message: string) {
    const toast = this.page.getByText(message);

    this.setScreenshotOptions({ mask: [toast], maskColor }); // highlight toast

    await expect(toast).toBeVisible();
  }
);

Then(
  'the user is redirected to the {string} page',
  async function (this: PlaywrightWorld, page: string) {
    if (page === 'home') {
      const homePage = this.page.locator('h1').getByText('Home');
      const homeUrl = this.page.url();

      this.setScreenshotOptions({ mask: [homePage], maskColor }); // highlight home page

      await expect(homePage).toBeVisible();
      await expect(homeUrl).toContain('/');
    } else if (page === 'login') {
      const loginPage = this.page.locator('h1').getByText('Login');
      const loginUrl = this.page.url();

      this.setScreenshotOptions({ mask: [loginPage], maskColor }); // highlight login page

      await expect(loginPage).toBeVisible();
      await expect(loginUrl).toContain('/login');
    } else if (page === 'profile') {
      const profilePage = this.page.locator('h1').getByText('Edit Profile');
      const homeUrl = this.page.url();

      this.setScreenshotOptions({ mask: [profilePage], maskColor }); // highlight home page

      await expect(profilePage).toBeVisible();
      await expect(homeUrl).toContain('/edit-profile');
    } else {
      throw new Error(`Unknown page: ${page}`);
    }
  }
);
