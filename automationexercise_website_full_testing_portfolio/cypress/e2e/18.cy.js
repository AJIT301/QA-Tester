/// <reference types="cypress" />


before(() => {

    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 18: View Category Products', () => {

    cy.contains('Category').should('be.visible');

    // View Women's Dress Category
    cy.selectCategory('Women', 'Dress');
    cy.contains('Women - Dress Products').should('be.visible');

    // View Men's Jeans Category
    cy.selectCategory('Men', 'Jeans');
    cy.contains('Men - Jeans Products').should('be.visible');
});