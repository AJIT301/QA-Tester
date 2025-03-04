

/// <reference types="cypress" />
it('Test Case 7: Verify Test Cases Page', () => {

    before(() => {
        cy.visit('https://automationexercise.com/');
        cy.url().should('eq', 'https://automationexercise.com/');
        cy.get('body').should('be.visible');
    });

    cy.get('ul.navbar-nav li').contains('Test Cases').click();

    cy.url().should('eq', 'https://automationexercise.com/test_cases');
    cy.get('body').should('be.visible');

});