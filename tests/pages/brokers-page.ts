import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BrokersPage extends BasePage {
  public understoodButton = this.page.locator('//button[text()="Understood"]');

  // Array of locators for all brokers
  public arrayOfallBrokers = this.page.locator(
    '//div[contains(@class, "MuiGrid-container")]/div[contains(@class, "MuiGrid-item")]',
  );

  public arrayOfAllBrokerNames = this.page.locator(
    '//div[contains(@class, "MuiGrid-container")]/div[contains(@class, "MuiGrid-item")]//h6',
  );

  public keywordInputField = this.page.locator('//input[@id="broker-keyword"]');

  public clearButton = this.page.locator('//button[text()="Clear"]');
  public selectedCity = this.page.locator(
    '//div[@id="city-select"][text()="Sofia"]',
  );

  public detailsButton =
    '//h6[text()="I want to change this dynamically on every itteration"]/ancestor::div//button[text()="Details"]';

  constructor(page: Page) {
    super(page);
  }

  async acceptCookies() {
    if (await this.understoodButton.isVisible()) {
      await this.understoodButton.click();
    }
  }

  async getBrokerCardPerName(name: string) {
    return this.page.locator(
      `//h6[text()="${name}"]/ancestor::div[contains(@class, "item")]`,
    );
  }

  async getDetailsButtonLocatorPerBroker(name: string) {
    return this.page.locator(
      `//h6[text()="${name}"]/ancestor::div//button[text()="Details"]`,
    );
  }

  async getAddressLocatorPerBroker(name: string) {
    return this.page.locator(`//h6[text()="${name}"]/ancestor::div/span`);
  }

  async getMobileNumberLocatorPerBroker(name: string) {
    return this.page
      .locator(
        `//h6[text()="${name}"]/ancestor::div//div//div//a[contains(@href, "tel")]`,
      )
      .nth(0);
  }

  async getLandlineNumberLocatorPerBroker(name: string) {
    return this.page
      .locator(
        `//h6[text()="${name}"]/ancestor::div//div//div//a[contains(@href, "tel")]`,
      )
      .nth(1);
  }

  async getPropertiesLocatorPerBroker(name: string) {
    return this.page.locator(
      `//h6[text()="${name}"]/ancestor::div/span/following-sibling::a`,
    );
  }
}
