/// <reference types="cypress" />

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 10: Verify Subscription in home page', () => {

    cy.get('div.single-widget').contains('Subscription');

    cy.get('input#susbscribe_email').click().type('asdasdasd1gb1@gmail.com');
    cy.get('#subscribe').click();

    cy.get('div.alert-success').contains('You have been successfully subscribed!').should('be.visible');

});
