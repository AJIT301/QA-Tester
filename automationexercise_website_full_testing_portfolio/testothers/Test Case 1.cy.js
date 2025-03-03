const { generateUser } = require("../support/userCommands");

describe("Test Case 1: Register User", () => {
  before(() => {
    const generatedUser = generateUser(); // ✅ Correct direct call
    cy.wrap(generatedUser).as("user");
  });

  it(`1`, function () {
    cy.visit("");

    cy.verifyHompageIsVisible();
    cy.initiateSignUp();
    cy.enterAccountInformation(this.user);
    cy.clickCreateAccount();
    cy.verifyUserIsLogged();
    cy.deleteAccount();
  });
});