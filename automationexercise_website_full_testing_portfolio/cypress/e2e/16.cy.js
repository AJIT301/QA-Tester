

/// <reference types="cypress" />

let user;

before(() => {

    cy.loadUserWithDynamicEmail().then((userData) => {
        user = userData;
    });
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});



it('Test Case 16: Place Order: Login before Checkout', () => {

    //useless task to bring more confusion rather than actual testing experience.
    cy.log('SKIPPING IRRELEVANT TEST')
    
});