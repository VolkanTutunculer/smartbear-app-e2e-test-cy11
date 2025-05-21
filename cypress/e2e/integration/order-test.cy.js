/// <reference types="cypress"/>

import LoginPage from "../../pages/LoginPage";
import OrderPage from "../../pages/OrderPage";
import ViewAllOrdersPage from "../../pages/ViewAllOrdersPage";

describe("Order Verification @Regression", () => {
  const loginPage = new LoginPage();
  const orderPage = new OrderPage();
  const viewAllOrdersPage = new ViewAllOrdersPage();

  beforeEach(() => {
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"));
    orderPage.clickOnLeftPanelOption("Order");
  });

  const testData = [
    [
      "FamilyAlbum",
      2,
      "John Doe",
      "123 Abc St",
      "Chicago",
      "IL",
      "12345",
      "Visa",
      "1234123412341234",
      "12/30"
    ],
    [
      "MyMoney",
      5,
      "John Doe",
      "123 Abc St",
      "Chicago",
      "IL",
      "12345",
      "MasterCard",
      "1234123412341234",
      "12/30"
    ],
    [
      "ScreenSaver",
      10,
      "John Doe",
      "123 Abc St",
      "Chicago",
      "IL",
      "12345",
      "American Express",
      "1234123412341234",
      "12/30"
    ]
  ];

  testData.forEach(data => {
    it(`TG11S - T301 Validate Order processing for ${data[0]}`, () => {
      orderPage.enterAllOrderInformation(...data);
  
      orderPage.getProcessButton().click();
      orderPage.getSuccessOrderMessage().should('be.visible');
      orderPage.clickOnLeftPanelOption('View all orders');

      viewAllOrdersPage
        .getRow(1)
        .should('include.text', data[1])
        .and('include.text', data[2])
        .and('include.text', data[7]);
    });
  })
});