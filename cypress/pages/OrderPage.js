import BasePage from "./BasePage";

export default class OrderPage extends BasePage {
  // Section Header Locators & Methods
  getSectionHeaders() {
    return cy.get('h3');
  }

  getSectionHeader(headerText) {
    return this.getSectionHeaders().contains(headerText);
  }

  // Product Information Locators & Methods
  getProductDropdown(){
    return cy.get('#ctl00_MainContent_fmwOrder_ddlProduct');
  }

  selectProduct(productName) {
    this.getProductDropdown().select(productName);
  }

  getQuantityInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_txtQuantity');
  }

  getTotalInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_txtTotal');
  }

  enterProductInformation(productName, quantity) {
    cy.log(`=======${productName}`);
    this.selectProduct(productName);
    this.getQuantityInput().clear().type(quantity);
  }

  // Address Information Locators & Methods
  getCustomerNameInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_txtName');
  }

  getStreetInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_TextBox2');
  }

  getCityInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_TextBox3');
  }

  getStateInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_TextBox4');
  }

  getZIPInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_TextBox5');
  }

  enterAddressInformation(customerName, street, city, state, ZIPCode) {
    this.getCustomerNameInput().type(customerName);
    this.getStreetInput().type(street);
    this.getCityInput().type(city);
    this.getStateInput().type(state);
    this.getZIPInput().type(ZIPCode);
  }

  // Payment Information Locators & Methods 
  getCardRadioButtons() {
    return cy.get('input[id*="cardList"]').parent();
  }

  selectCardOption(optionText) {
    this.getCardRadioButtons().contains(optionText).click();
  }

  getCardNumberInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_TextBox6');
  }

  getExpDateInput() {
    return cy.get('#ctl00_MainContent_fmwOrder_TextBox1');
  }

  enterPaymentInformation(cardOption, cardNumber, expDate) {
    this.selectCardOption(cardOption);
    this.getCardNumberInput().type(cardNumber);
    this.getExpDateInput().type(expDate);
  }

  getProcessButton() {
    return cy.get('#ctl00_MainContent_fmwOrder_InsertButton');
  }

  getResetButton() {
    return cy.get('[value="Reset"]');
  }

  // Reusable methods
  enterAllOrderInformation(productName, quantity, customerName, street, city, state, ZIPCode, cardOption, cardNumber, expDate) {
    this.enterProductInformation(productName, quantity);
    this.enterAddressInformation(customerName, street, city, state, ZIPCode);
    this.enterPaymentInformation(cardOption, cardNumber, expDate)
  }

  getSuccessOrderMessage() {
    return cy.contains('New order has been successfully added.');
  }
}