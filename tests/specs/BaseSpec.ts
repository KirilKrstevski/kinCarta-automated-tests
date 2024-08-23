import { Browser, BrowserContext, Page } from "@playwright/test";
import { BrokersStep } from "../steps";
import { Logger } from "winston";
import { GetConfig, TestConfig } from "../utils/config";
import { randomUUID } from "crypto";

export class BaseSpec {
  public browser: Browser;
  public context: BrowserContext;
  public page: Page;
  public logger: Logger;
  public testId: string;
  public testConfig: TestConfig;

  // For reusability during tests defining all Steps here
  public brokersStep: BrokersStep;

  constructor(browser: Browser, context: BrowserContext, page: Page) {
    this.testConfig = GetConfig();
    this.logger = this.testConfig.logger;
    this.browser = browser;
    this.context = context;
    this.page = page;

    // Setting a unique ID for each test if we decide to stream test analytics in the future
    this.testId = randomUUID();
    this.logger.info(`Current test ID: ${this.testId}`);

    // Initialization of steps

    this.brokersStep = new BrokersStep(this.page);

    this.logger.info(
      `Initialized BaseSpec with BASE_URL: ${this.testConfig.BASE_URL}`,
    );
  }
}
