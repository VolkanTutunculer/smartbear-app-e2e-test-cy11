/// <reference types="cypress"/>

import ViewAllOrdersPage from "../../pages/ViewAllOrdersPage";
import LoginPage from "../../pages/LoginPage";

describe("View All Orders Verification @Regression", () => {
  const loginPage = new LoginPage();
  const viewAllOrdersPage = new ViewAllOrdersPage();

  beforeEach(() => {
    loginPage.login(Cypress.env("APP_USERNAME"), Cypress.env("PASSWORD"));
  });

  it('TG11S - T123 Validate "View All Orders" table', () => {
    viewAllOrdersPage.getRows().should("have.length", 9);
    viewAllOrdersPage.getTableHeaders().should("have.length", 13);

    const expectedHeaderText = [
      "",
      "Name",
      "Product",
      "#",
      "Date",
      "Street",
      "City",
      "State",
      "Zip",
      "Card",
      "Card Number",
      "Exp",
      "",
    ];

    viewAllOrdersPage.getTableHeaders().each((el, index) => {
      if (index > 0 && index < expectedHeaderText.length - 1) {
        cy.wrap(el).should("have.text", expectedHeaderText[index]);
      }
    });
  });

  it('TG11S - T124 Validate "Check All" and "Uncheck All" checkboxes', () => {
    // viewAllOrdersPage.getColumn(0).each((el) => {
    //   cy.wrap(el).find("input").should("not.be.checked");
    // });

    // viewAllOrdersPage.getCheckAllButton().click();
    // viewAllOrdersPage.getColumn(0).each((el) => {
    //   cy.wrap(el).find("input").should("be.checked");
    // });

    // viewAllOrdersPage.getUnCheckAllButton().click();
    // viewAllOrdersPage.getColumn(0).each((el) => {
    //   cy.wrap(el).find("input").should("not.be.checked");
    // });

    const validateCheckBoxes = (checked) => {
      if (checked) {
          viewAllOrdersPage.getCheckAllButton().click();
          viewAllOrdersPage.getColumn(0).each((el) => {
          cy.wrap(el).find("input").should("be.checked");
        });
      } else {
          viewAllOrdersPage.getUnCheckAllButton().click();
          viewAllOrdersPage.getColumn(0).each((el) => {
          cy.wrap(el).find("input").should("not.be.checked");
        });
      }
    };

    validateCheckBoxes(false);
    validateCheckBoxes(true);
    validateCheckBoxes(false);
  });

  it('TG11S - T125 Validate rows can be deleted', () => {
    viewAllOrdersPage.getRows().should("have.length", 9);
    viewAllOrdersPage.getColumn(0).first().click();
    viewAllOrdersPage.getDeleteSelectedButton().click();
    viewAllOrdersPage.getRows().should("have.length", 8);
  });

  it('TG11S - T126 Validate all rows deleted', () => {
    // viewAllOrdersPage.getColumn(0).each((el) => {
    //   cy.wrap(el).click();
    // });
    viewAllOrdersPage.getRows().should("have.length", 9);
    viewAllOrdersPage.getCheckAllButton().click();
    viewAllOrdersPage.getDeleteSelectedButton().click();
    viewAllOrdersPage.getEmptyOrdersTableMessage().should('be.visible');
  });
});