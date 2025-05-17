export default class BasePage {
  getWebOrdersHeading() {
    return cy.get('h1');
  }

  getWelcomeUserInfo() {
    return cy.contains('Welcome,')
  }

  getLogoutButton() {
    return cy.get('#ctl00_logout');
  }

  getLeftPanelOptions() {
    return cy.get('#ctl00_menu a');
  }
}