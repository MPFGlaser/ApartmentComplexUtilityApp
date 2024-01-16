import { Then, When } from '@cucumber/cucumber';
import { PlaywrightWorld } from '@gnuechtel/nx-cucumber';
import { maskColor } from '../shared';
import { expect } from 'playwright/test';

When(
  'the user clicks on the repair requests link in the navigation bar',
  async function (this: PlaywrightWorld) {
    const repairRequestsLink = this.page
      .getByTestId('navigation-tickets-button')
      .nth(0);

    this.setScreenshotOptions({ mask: [repairRequestsLink], maskColor }); // highlight repair requests link

    await repairRequestsLink.click();
  }
);

When(
  'the user sees the repair request with title {string}',
  async function (this: PlaywrightWorld, title: string) {
    const repairRequestLink = this.page.getByText(title).nth(0);

    this.setScreenshotOptions({ mask: [repairRequestLink], maskColor }); // highlight repair request link

    await expect(repairRequestLink).toBeVisible();
  }
);

When(
  'the user clicks on the repair request with title {string}',
  async function (this: PlaywrightWorld, title: string) {
    const repairRequestLink = this.page.getByText(title).nth(0);

    this.setScreenshotOptions({ mask: [repairRequestLink], maskColor }); // highlight repair request link

    await repairRequestLink.click();
  }
);

Then(
  'the user should see a list of repair requests',
  async function (this: PlaywrightWorld) {
    const pageHeader = this.page.locator('h1').getByText('Repair Requests');
    const table = this.page.getByTestId('ticket-table');

    this.setScreenshotOptions({ mask: [pageHeader, table], maskColor }); // highlight repair requests list

    await expect(pageHeader).toBeVisible();
    await expect(table).toBeVisible();
  }
);

Then(
  'the user should see a button to create a new repair request',
  async function (this: PlaywrightWorld) {
    const createTicketButton = this.page.getByTestId('create-ticket-button');

    this.setScreenshotOptions({ mask: [createTicketButton], maskColor }); // highlight create repair request button

    await expect(createTicketButton).toBeVisible();
  }
);

Then(
  'the user should see the repair request details',
  async function (this: PlaywrightWorld) {
    const url = this.page.url();
    const breadCrumb = this.page.getByText('Details', { exact: true });

    this.setScreenshotOptions({ mask: [breadCrumb], maskColor }); // highlight repair request details

    await expect(breadCrumb).toBeVisible();
    expect(url).toContain('/tickets/view/');
  }
);

Then(
  'the title of the repair request should be {string}',
  async function (this: PlaywrightWorld, title: string) {
    const ticketTitle = this.page.getByTestId('ticket-title');

    this.setScreenshotOptions({ mask: [ticketTitle], maskColor }); // highlight repair request title

    await expect(ticketTitle).toContainText(title);
  }
);
