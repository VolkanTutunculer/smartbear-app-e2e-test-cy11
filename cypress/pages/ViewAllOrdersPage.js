import BasePage from "./BasePage";

export default class ViewAllOrdersPage extends BasePage {
  getCheckAllButton() {
    return cy.get('#ctl00_MainContent_btnCheckAll');
  }

  getUnCheckAllButton() {
    return cy.get('#ctl00_MainContent_btnUncheckAll');
  }

  getDeleteSelectedButton() {
    return cy.get('#ctl00_MainContent_btnDelete');
  }

  getEmptyOrdersTableMessage() {
    return cy.get('#ctl00_MainContent_orderMessage');
  }
}