/// <reference types="cypress" />

before(() => {

    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});


it('should verify scroll up and scroll down functionality without arrow button', () => {


    cy.scrollTo('bottom');

    cy.contains('h2', 'Subscription').should('be.visible');

    cy.scrollTo('top');

    cy.contains('div', 'Full-Fledged practice website for Automation Engineers').should('be.visible');

    cy.log("Test case 26 completed.");
});