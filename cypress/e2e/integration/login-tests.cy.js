/// <reference types="cypress"/>
import BasePage from "../../pages/BasePage";
import LoginPage from "../../pages/LoginPage";

const loginPage = new LoginPage();
const basePage = new BasePage();

describe("Login Verification", () => {


  it("Validate login with valid credentials", () => {
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"));

    cy.url().should("include", "weborders");

    basePage.getWebOrdersHeading().should("have.text", "Web Orders");
    basePage.getLogoutButton().should("have.text", "Logout");
    basePage
      .getWelcomeUserInfo()
      .should("include.text", Cypress.env("APP_USERNAME"));
  });

  it("TG11S-T142 - Validate logout", () => {
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"));
    basePage.getLogoutButton().click();
    cy.url().should("include", "Login");
    loginPage.getLoginForm().should("be.visible");
  });

  [
    {
      title: "empty creds",
      username: "",
      password: "",
    },
    {
      title: "invalid Username Valid Password",
      username: "InvalidUsername",
      password: Cypress.env("PASSWORD"),
    },
    {
      title: "valid Username Invalid Password",
      username: Cypress.env("APP_USERNAME"),
      password: "InvalidPassword",
    },
    {
      title: "invalid Username Invalid Password",
      username: "InvalidUsername",
      password: "InvalidPassword",
    },
  ].forEach((creds) => {
    it(`TG11S-T164 - Validate login with invalid credentials ${creds.title}`, () => {
      loginPage.login(creds.username, creds.password);

      cy.url().should("include", "login");
      loginPage
        .getErrorMessage()
        .should("have.text", "Invalid Login or Password.");
    });
  });
});

describe("Login Verification - Additional Tests", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("APP_BASE_URL"));
  });

  it("TG115-T175 - Validate the password input is masked", () => {
    loginPage.getPasswordInput().should("have.attr", "type", "password");
  });

  
  it("TG115-T175 - Validate login with valid cred and hit enter", () => {
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"), false);

    cy.url().should("include", "weborders");

    basePage.getWebOrdersHeading().should("have.text", "Web Orders");
    basePage.getLogoutButton().should("have.text", "Logout");
    basePage
      .getWelcomeUserInfo()
      .should("include.text", Cypress.env("APP_USERNAME"));
  });
});
