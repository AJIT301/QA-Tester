/// <reference types="cypress" />


before(() => {

    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 19: View & Cart Brand Products', () => {

    cy.get('ul.navbar-nav').contains('Products').click();

    cy.contains('Brands').should('be.visible');

    // Reusable function to handle any brand selection
    cy.selectBrandAndVerify('Polo');
    cy.selectBrandAndVerify('H&M');
});
