import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '@gnuechtel/nx-cucumber';
import { maskColor } from '../shared';

When(
  'the user requests project information',
  async function (this: PlaywrightWorld) {
    const whatsNextButton = this.page.getByRole('link', {
      name: "What's next?",
    });
    this.setScreenshotOptions({ mask: [whatsNextButton], maskColor }); // highlight what-is-next link
    await whatsNextButton.click();
  }
);

Then(
  /^the user is shown a card with information about repair requests$/,
  async function (this: PlaywrightWorld) {
    const repairRequestsCard = this.page.locator(
      '.MuiCard-root >> text="Repair Requests"'
    );
    this.setScreenshotOptions({ mask: [repairRequestsCard], maskColor }); // highlight next-steps headline
    await repairRequestsCard.scrollIntoViewIfNeeded();
    await expect(repairRequestsCard).toBeVisible();
  }
);

Then(
  /^a welcome message will be shown$/,
  async function (this: PlaywrightWorld) {
    const welcome = this.page
      .locator('h1')
      .getByText('Welcome to the Apartment Complex Utility App');
    this.setScreenshotOptions({ mask: [welcome], maskColor }); // highlight welcome headline
    await expect(welcome).toBeVisible();
  }
);
