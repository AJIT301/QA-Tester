

/// <reference types="cypress" />
before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 5: Register User with existing email', () => {
    
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();

    cy.url().should('eq', 'https://automationexercise.com/login');
    cy.get('body').should('be.visible');
    cy.get('.signup-form').contains('New User Signup!').should('be.visible');

    cy.get('input[data-qa="signup-name"]').click().type('AJtest3301');
    cy.get('input[data-qa="signup-email"]').click().type('asdasdasd1gb1@gmail.com');
    cy.get('button[data-qa="signup-button"]').click();

    cy.contains('Email Address already exist!').should('be.visible');

});