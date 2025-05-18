/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

describe('Login Verification', () => {

  const loginPage = new LoginPage();
  const basePage = new BasePage();

  it('Validate login with valid credentials', () => {
    cy.visit(Cypress.env('APP_BASE_URL'));

    loginPage.login(Cypress.env('APP_USERNAME'), Cypress.env('PASSWORD'));

    cy.url().should('include', 'weborders');

    basePage.getWebOrdersHeading().should('have.text', 'Web Orders');
    basePage.getLogoutButton().should('have.text', 'Logout');
    basePage.getWelcomeUserInfo().should('include.text', Cypress.env('APP_USERNAME'));
  })

    it("TG11S-T142 - Validate logout", () => {
    cy.visit(Cypress.env("APP_BASE_URL"));
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"));
    basePage.getLogoutButton().click();
    cy.url().should("include", "Login");
    loginPage.getLoginForm().should("be.visible");
  });

  [
    {
      username: "",
      password: "",
    },
    {
      username: "InvalidUsername",
      password: Cypress.env("PASSWORD"),
    },
    {
      username: Cypress.env("APP_USERNAME"),
      password: "InvalidPassword",
    },
    {
      username: "InvalidUsername",
      password: "InvalidPassword",
    },
  ].forEach((creds) => {
    it(`TG11S-T164 - Validate login with invalid credentials ${creds.username} ${creds.password}`, () => {
      cy.visit(Cypress.env("APP_BASE_URL"));

      if(creds.username === '' && creds.password === '') loginPage.clickOnLoginButton();
      else loginPage.login(creds.username, creds.password);

      cy.url().should("include", "login");
      loginPage.getErrorMessage().should('have.text', 'Invalid Login or Password.');
    });
  });
});
