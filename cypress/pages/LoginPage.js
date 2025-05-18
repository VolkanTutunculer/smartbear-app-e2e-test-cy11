export default class LoginPage {

   getLoginForm() {
    return cy.get('#aspnetForm');
  }
  
  getUsernameInput() {
    return cy.get("#ctl00_MainContent_username");
  }

  getPasswordInput() {
    return cy.get("#ctl00_MainContent_password");
  }

  getLoginButton() {
    return cy.get("#ctl00_MainContent_login_button");
  }

  getErrorMessage() {
    return cy.get("#ctl00_MainContent_status");
  }

  // Reusable methods for login page
  enterUsername(username) {
    this.getUsernameInput().type(username);
  }

  enterPassword(password) {
    this.getPasswordInput().type(password);
  }

  clickOnLoginButton() {
    this.getLoginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickOnLoginButton();
  }
}