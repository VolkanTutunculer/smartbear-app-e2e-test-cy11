/// <reference types ="cypress"/>

import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/loginPage";

describe("Login Verification", () => {
  const loginPage = new LoginPage();
  const basePage = new BasePage();

it("Validate Login with valid credentials", () => {
    cy.visit(Cypress.env('APP_BASE_URL'));

    loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));

    cy.url().should("include", "Web Orders");

    basePage.getWebOrdersHeading().should("have.text", "Web Orders");

    basePage.getLogoutButton().should("have.text", "Logout");

    basePage
      .getWelcomeUserInfo()
      .should("include.test", Cypress.env("USERNAME"));
  });
});
