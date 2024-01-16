import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '@gnuechtel/nx-cucumber';
import { maskColor } from '../shared';
// When the user clicks on the login button
// Then the user is redirected to the login page

When(
  'the user clicks on the login button in the navigation bar',
  async function (this: PlaywrightWorld) {
    const loginButton = this.page.getByTestId('navigation-login-button').nth(0);

    this.setScreenshotOptions({ mask: [loginButton], maskColor }); // highlight login button

    await loginButton.click();
  }
);

Then(
  'the user is redirected to the login page',
  async function (this: PlaywrightWorld) {
    const loginPage = this.page.locator('h1').getByText('Login');
    const loginUrl = this.page.url();

    this.setScreenshotOptions({ mask: [loginPage], maskColor }); // highlight login page

    await expect(loginPage).toBeVisible();
    await expect(loginUrl).toContain('/login');
  }
);

When(
  'the user has found the login page',
  async function (this: PlaywrightWorld) {
    await this.visit('/login');
  }
);

When(
  'the user enters the email {string}',
  async function (this: PlaywrightWorld, email: string) {
    const emailInput = this.page.getByRole('textbox', { name: 'Email' });

    this.setScreenshotOptions({ mask: [emailInput], maskColor }); // highlight email input

    await emailInput.fill(email);
  }
);

When(
  'the user enters the password {string}',
  async function (this: PlaywrightWorld, password: string) {
    const passwordInput = this.page.getByRole('textbox', { name: 'Password' });

    this.setScreenshotOptions({ mask: [passwordInput], maskColor }); // highlight password input

    await passwordInput.fill(password);
  }
);

When(
  'the user clicks on the login button',
  async function (this: PlaywrightWorld) {
    const loginButton = this.page.getByTestId('login-button');

    this.setScreenshotOptions({ mask: [loginButton], maskColor }); // highlight login button

    await loginButton.click();
  }
);

Then(
  'the user is {string}',
  async function (this: PlaywrightWorld, status: string) {
    if (status === 'not logged in') {
      const loginButton = this.page
        .getByTestId('navigation-login-button')
        .nth(0);

      this.setScreenshotOptions({ mask: [loginButton], maskColor }); // highlight login button

      await expect(loginButton).toBeVisible();
    } else if (status === 'logged in') {
      const displayName = this.page
        .getByTestId('navigation-display-name')
        .nth(0);

      this.setScreenshotOptions({ mask: [displayName], maskColor }); // highlight display name

      await expect(displayName).toBeVisible();
    } else {
      throw new Error(`Unknown status: ${status}`);
    }
  }
);

Then('the user sees a logout button', async function (this: PlaywrightWorld) {
  const logoutButton = this.page
    .getByTestId('navigation-signout-button')
    .nth(0);

  this.setScreenshotOptions({ mask: [logoutButton], maskColor }); // highlight logout button

  await expect(logoutButton).toBeVisible();
});
