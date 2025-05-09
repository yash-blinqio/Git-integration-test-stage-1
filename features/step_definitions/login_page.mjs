import { Given, When, Then, After, setDefaultTimeout, Before } from "@dev-blinq/cucumber-js";
import { closeContext, initContext, navigate } from "automation_model";
setDefaultTimeout(60 * 1000);

const path = null;

const elements = {
  listitem_blinq_admin: {
    locators: [
      { css: 'internal:text="blinq_admin"i >> xpath=..', priority: 1 },
      { css: 'internal:text="blinq_admin"s >> xpath=..', priority: 1 },
      { css: 'li >> internal:has-text="blinq_admin"i', priority: 1 },
      { css: "li >> internal:has-text=/^blinq_admin$/", priority: 1 },
    ],
    element_name: "blinq_admin listitem",
  },
  text_blinq_admin: {
    locators: [
      { css: 'internal:text="blinq_admin"i', priority: 1 },
      { css: 'internal:text="blinq_admin"s', priority: 1 },
      { css: 'p >> internal:has-text="blinq_admin"i', priority: 1 },
      { css: "p >> internal:has-text=/^blinq_admin$/", priority: 1 },
    ],
    element_name: "blinq_admin Text",
  },
};

let context = null;
Before(async function () {
  if (!context) {
    context = await initContext(path, false, false, this);
  }
  await navigate(path);
});
After(async function () {
  await closeContext();
  context = null;
});
/**
 * The user clicks on the blinq_admin list item on the login page
 * @recorder
 * @path=/login
 */
async function the_user_clicks_on_the_blinq_admin_list_item_on_the_login_page() {
  // source: recorder
  // implemented_at: 2025-05-09T06:36:24.698Z
  const _params = {};
  // Click on blinq_admin listitem
  await context.web.click(elements["listitem_blinq_admin"], _params, null, this);
}

Given(
  "The user clicks on the blinq_admin list item on the login page",
  { timeout: 60000 },
  the_user_clicks_on_the_blinq_admin_list_item_on_the_login_page
);

/**
 * The user clicks on blinq_admin
 * @recorder
 * @path=/login
 */
async function the_user_clicks_on_blinq_admin() {
  // source: recorder
  // implemented_at: 2025-05-09T06:37:48.642Z
  const _params = {};
  // Click on blinq_admin Text
  await context.web.click(elements["text_blinq_admin"], _params, null, this);
}

Given("The user clicks on blinq_admin", { timeout: 60000 }, the_user_clicks_on_blinq_admin);
