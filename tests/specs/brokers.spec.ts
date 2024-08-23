import { test, expect } from "playwright/test";
import { BaseSpec } from "./BaseSpec";

test.describe("K+C - Verify all brokers scenario", () => {
  let baseSpec: BaseSpec;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({});
    const page = await context.newPage();
    baseSpec = new BaseSpec(browser, context, page);
  });

  test("Verify all Brokers data", async () => {
    await baseSpec.context.grantPermissions([], {
      origin: baseSpec.testConfig.BASE_URL,
    }); // Granting location permissionss
    await baseSpec.page.goto(baseSpec.testConfig.BASE_URL);
    await baseSpec.brokersStep.brokersPage.acceptCookies(); // Accept cookies if available

    await baseSpec.brokersStep.scrollToTheBottom(); // Scroll to the bottom of the page until there are no new brokers loading

    // Put all names in a array
    var allBrokerNamesLocators =
      await baseSpec.brokersStep.brokersPage.arrayOfAllBrokerNames.all();
    var allNames = [];
    for (let i = 0; i < allBrokerNamesLocators.length; i++) {
      allNames.push(await allBrokerNamesLocators[i].innerText());
    }

    // Search by the name of each broker and making sure all data is visible and displayed
    for (let i = 0; i < allNames.length; i++) {
      await baseSpec.brokersStep.brokersPage.keywordInputField.scrollIntoViewIfNeeded();

      await baseSpec.brokersStep.brokersPage.keywordInputField.fill(
        allNames[i],
      ); // Enter broker's name into the search field

      // Wait until the url with the searched keyword query parameter is loaded
      const urlWithName =
        await baseSpec.brokersStep.createCustomUrlWithBrokersName(
          allNames[i],
          baseSpec.testConfig.BASE_URL,
        );
      await baseSpec.page.waitForURL(urlWithName, { timeout: 3000 });

      await baseSpec.brokersStep.waitUntilThereIsOneResult(); // Make sure only one result per searched name is present

      // Verify the name of the broker in the search results is the one that is being searched
      let allBrokerNamesLocators =
        await baseSpec.brokersStep.brokersPage.arrayOfAllBrokerNames.all(); // Get all broker names locators (in this case only one)
      expect(await allBrokerNamesLocators[0].innerText()).toBe(allNames[i]);

      // Make sure the unique Details expand button is clicked
      let detailsButtonPerBroker =
        await baseSpec.brokersStep.brokersPage.getDetailsButtonLocatorPerBroker(
          allNames[i],
        );
      await detailsButtonPerBroker.click();

      // Verify broker's Address is displayed
      let addressPerBroker =
        await baseSpec.brokersStep.brokersPage.getAddressLocatorPerBroker(
          allNames[i],
        ); // Make sure Address locator is unique per broker
      expect(addressPerBroker.innerText()).toBeDefined();

      // Verify broker's Mobile number is displayed
      let mobileNumberPerBroker =
        await baseSpec.brokersStep.brokersPage.getMobileNumberLocatorPerBroker(
          allNames[i],
        ); // Make sure Mobile number locator is unique per broker
      expect(mobileNumberPerBroker.innerText).toBeDefined();

      // Verify broker's Landline number is displayed
      let landlineNumberPerBroker =
        await baseSpec.brokersStep.brokersPage.getLandlineNumberLocatorPerBroker(
          allNames[i],
        ); // Make sure Landline number locator is unique per broker
      expect(landlineNumberPerBroker.innerText).toBeDefined();

      // Verify broker's Properties are displayed
      let propertiesPerBroker =
        await baseSpec.brokersStep.brokersPage.getPropertiesLocatorPerBroker(
          allNames[i],
        ); // Make sure Properties locator is unique per broker
      expect(propertiesPerBroker.innerText).toBeDefined();

      await baseSpec.brokersStep.brokersPage.clearButton.click(); // Clear searched keyword/name from the search input field
      await baseSpec.page.waitForURL(baseSpec.testConfig.BASE_URL, {
        timeout: 3000,
      }); // Wait the correct url is loaded after clicking the clear button
    }
  });
});
