import { Locator, Page } from "@playwright/test";
import { BaseStep } from "./BaseStep";
import { BrokersPage } from "tests/pages";

export class BrokersStep extends BaseStep {
  readonly page: Page;

  public brokersPage: BrokersPage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.brokersPage = new BrokersPage(page);
  }

  async scrollToTheBottom() {
    var oldCount = 0;
    var newCount = 0;

    while (true) {
      newCount = await this.brokersPage.arrayOfallBrokers.count();

      if (newCount === oldCount) {
        break; // Stop scrolling if there are no new Brokers available
      }

      oldCount = newCount;

      // Human-like scroll because the page has lazy-loading
      await this.page.evaluate(() => {
        window.scrollBy({
          top: window.innerHeight / 2,
          behavior: "smooth",
        });
      });

      await this.page.waitForTimeout(Math.floor(Math.random() * 1000) + 500);
    }
  }

  async createCustomUrlWithBrokersName(brokerName: string, url: string) {
    const nameParts = brokerName.split(" ");
    let firstName, lastName;
    let firstname, lastname, lastname2;
    var urlWithName = "";

    if (nameParts.length == 2) {
      [firstName, lastName] = nameParts;
      urlWithName = `${url}&keyword=${firstName}+${lastName}`;
    } else if (nameParts.length === 3) {
      [firstname, lastname, lastname2] = nameParts;
      urlWithName = `${url}&keyword=${firstname}+${lastname}+${lastname2}`;
    }

    return urlWithName;
  }

  async getArrayOfAllBrokerElements() {
    return await this.brokersPage.arrayOfallBrokers.all();
  }

  async waitUntilThereIsOneResult() {
    let arrayOfallBrokers: Locator[] = [];
    let count = 0;

    arrayOfallBrokers = await this.getArrayOfAllBrokerElements();
    count = arrayOfallBrokers.length;

    let stableCount = 0;
    let maxStableCount = 3;

    if (count == 1) {
      stableCount += 1;
      if (stableCount >= maxStableCount) {
        return;
      }
    } else {
      stableCount = 0;
    }
    await this.page.waitForTimeout(300);
    arrayOfallBrokers = await this.getArrayOfAllBrokerElements();
    count = arrayOfallBrokers.length;
  }
}
