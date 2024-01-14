import { When } from '@cucumber/cucumber';
import { PlaywrightWorld } from '@gnuechtel/nx-cucumber';

// Given + When
When(
  /^(?:\w+.*?) (?:has found|visits) the home page$/,
  async function (this: PlaywrightWorld) {
    await this.visit('/');
  }
);
