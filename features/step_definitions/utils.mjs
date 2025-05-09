import {
  Given,
  When,
  Then,
  After,
  setDefaultTimeout,
  Before,
  defineStep,
  AfterStep,
  BeforeStep,
} from "@dev-blinq/cucumber-js";
import { closeContext, initContext, navigate, executeBrunoRequest, verifyFileExists } from "automation_model";
import path from "path";
setDefaultTimeout(60 * 1000);

const url = null;

const elements = {};

let context = null;
Before(async function (scenario) {
  if (!context) {
    context = await initContext(url, false, false, this);
  }
  await navigate(url);
  await context.web.beforeScenario(this, scenario);
});
After(async function (scenario) {
  await context.web.afterScenario(this, scenario);
  await closeContext();
  context = null;
});

BeforeStep(async function (step) {
  if (context) {
    await context.web.beforeStep(this, step);
  }
});

AfterStep(async function (step) {
  if (context) {
    await context.web.afterStep(this, step);
  }
});

/**
 * Load test data for a user
 * @param {string} user name of the user to load test data for
 * @protect
 */
async function loadUserData(user) {
  await context.web.loadTestDataAsync("users", user, this);
}

/**
 * Verify text exsits in page
 * @param {string} text the text to verify exists in page
 * @protect
 */
async function verifyTextExistsInPage(text) {
  await context.web.verifyTextExistInPage(text, null, this);
}

Then("Verify the text {string} can be found in the page", verifyTextExistsInPage);

/**
 * Click on an element given a description
 * @param {string} elementDescription element description
 * @protect
 */
async function clickOnElement(elementDescription) {
  await context.web.simpleClick(elementDescription, null, null, this);
}
When("click on {string}", clickOnElement);
When("click {string}", clickOnElement);
When("Click on {string}", clickOnElement);
When("Click {string}", clickOnElement);

/**
 * Fill an element with a value
 * @param {string} elementDescription element description
 * @param {string} value value to fill the element with
 * @protect
 */
async function fillElement(elementDescription, value) {
  await context.web.simpleClickType(elementDescription, value, null, null, this);
}
When("fill {string} with {string}", fillElement);
When("Fill {string} with {string}", fillElement);
/**
 * Verify text does not exist in page
 * @param {string} text the text to verify does not exist in page
 * @protect
 */
async function verifyTextNotExistsInPage(text) {
  await context.web.waitForTextToDisappear(text, null, this);
}
Then("Verify the text {string} cannot be found in the page", verifyTextNotExistsInPage);

/**
 * Navigate to "<url>"
 * @param {string} url URL to navigate
 * @protect
 */
async function navigateTo(url) {
  await context.web.goto(url, this);
}
When("Navigate to {string}", navigateTo);

/**
 * Store browser session "<path>"
 * @param {string} filePath the file path or empty to store in the test data file
 * @protect
 */
async function storeBrowserSession(filePath) {
  await context.web.saveStoreState(filePath, this);
}
When("Store browser session {string}", storeBrowserSession);

/**
 * Reset browser session with session file "<path>"
 * @param {string} filePath the file path or empty
 * @protect
 */
async function resetBrowserSession(filePath) {
  await context.web.restoreSaveState(filePath, this);
}
When("Reset browser session {string}", resetBrowserSession);

/**
 * Identify the text "<textAnchor>", climb "<climb>" levels in the page, validate text "<textToVerify>" can be found in the context
 * @param {string} textAnchor the anchor text
 * @param {string} climb no of levels to climb up in the tree
 * @param {string} textToVerify the target text to verify
 * @protect
 */
async function verifyTextRelatedToText(textAnchor, climb, textToVerify) {
  await context.web.verifyTextRelatedToText(textAnchor, climb, textToVerify, null, this);
}
Then(
  "Identify the text {string}, climb {string} levels in the page, validate text {string} can be found in the context",
  verifyTextRelatedToText
);
/**
 * execute bruno single request given the bruno project is placed in a folder called bruno under the root of the cucumber project
 * @requestName the name of the bruno request file
 * @protect
 */
async function runBrunoRequest(requestName) {
  await executeBrunoRequest(requestName, {}, context, this);
}

When("bruno - {string}", runBrunoRequest);

/**
 * Verify the file "<fileName>" exists
 * @param {string} fileName the downloaded file to verify
 * @protect
 */
async function verify_the_downloaded_file_exists(fileName) {
  const downloadFolder = path.join(context.reportFolder, "downloads");
  const downloadFile = path.join(downloadFolder, fileName);
  await verifyFileExists(downloadFile, {}, context, this);
}

Then("Verify the file {string} exists", { timeout: 60000 }, verify_the_downloaded_file_exists);
