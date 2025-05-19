///<reference types="cypress"/>

import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

describe('Base Test @Smoke', () => {
  const loginPage = new LoginPage();
  const basePage = new BasePage();

  it('TG11S-T183 - Validate main content after login', () => {
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"));

    const leftPanelOptions = ["View all orders", "View all products", "Order"];
    const rightPanelHeadings = ["List of All Orders", "List of Products", "Order"];

    for(let i = 0; i <= 2; i++) {
      basePage.getLeftPanelOptions().eq(i).click();
      basePage.getLeftPanelOptions().eq(i).should('have.text', leftPanelOptions[i]);

      basePage.getRightPanelHeading().should('include.text', rightPanelHeadings[i]);
      basePage.getRightPanelMainContentTable().should('be.visible');
    }
  });
});