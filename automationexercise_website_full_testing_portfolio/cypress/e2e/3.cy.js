

/// <reference types="cypress" />
before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 3: Login User with incorrect email and password', () => {

    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="login-email"]').type('3301301301@gmail.com');
    cy.get('input[data-qa="login-password"]').type('justapassword');
    cy.get('button[data-qa="login-button"]').click();

    cy.contains('Your email or password is incorrect!').should('be.visible');
    cy.log('Test case 3 end');
});