/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

describe('Login Verification', () => {

  const loginPage = new LoginPage();
  const basePage = new BasePage();

  it('Validate login with valid credentials', () => {
    cy.visit(Cypress.env('APP_BASE_URL'));

    loginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));

    cy.url().should('include', 'weborders');

    basePage.getWebOrdersHeading().should('have.text', 'Web Orders');
    basePage.getLogoutButton().should('have.text', 'Logout');
    basePage.getWelcomeUserInfo().should('include.text', Cypress.env('USERNAME'));
  })
});