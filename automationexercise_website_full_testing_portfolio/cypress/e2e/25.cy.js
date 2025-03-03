/// <reference types="cypress" />

before(() => {

    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});


it('should verify scroll up and scroll down functionality', () => {
  
    cy.scrollTo('bottom');

    cy.contains('h2', 'Subscription').should('be.visible');

    cy.get('#scrollUp').click();

    cy.wait(1000);

    cy.contains('div', 'Full-Fledged practice website for Automation Engineers').should('be.visible');

    cy.log("Test case 25 completed.");
});
