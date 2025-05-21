/// <reference types="cypress"/>

import ListOfProductsPage from "../../pages/ListOfProductsPage";
import LoginPage from "../../pages/LoginPage";

describe("List Of Products Verification @Regression", () => {
  const loginPage = new LoginPage();
  const listOfProductsPage = new ListOfProductsPage();

  beforeEach(() => {
    loginPage.login(Cypress.env("App_USERNAME"), Cypress.env("PASSWORD"));
    listOfProductsPage.clickOnLeftPanelOption('View all products')
  });

  it('TG11S - T201 Validate list of products table', () => {
      listOfProductsPage.getRows().should('have.length', 4);
      listOfProductsPage.getTableHeaders().should('have.length', 3);

      const expectedTableTexts = [
        ["Product name", "Price", "Discount"],
        ["MyMoney",	"$100",	"8%"],
        ["FamilyAlbum",	"$80",	"15%"],
        ["ScreenSaver",	"$20",	"10%"]
      ];


      listOfProductsPage.getRows().each((row, i) => {
        cy.wrap(row).children().each((cell, j) => {
          cy.wrap(cell).should('have.text', expectedTableTexts[i][j]);
        });
      }); 
  });
});