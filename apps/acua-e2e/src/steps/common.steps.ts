import { Then, When } from '@cucumber/cucumber';
import { PlaywrightWorld } from '@gnuechtel/nx-cucumber';
import { expect } from 'playwright/test';
import { maskColor } from '../shared';

// Given + When
When(/^.* user visits the home page$/, async function (this: PlaywrightWorld) {
  await this.visit('/');
});

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
