

/// <reference types="cypress" />

let user;

before(() => {
    cy.loadUserWithDynamicEmail().then((userData) => {
        user = userData;
    });
});

it('Signup, login and delete the account', () => {

    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');


    cy.signupUser(user);

    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    cy.logoutUser();

    cy.loginUser(user);

    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    cy.deleteUserAccount();

    cy.get('body').should('be.visible');
    cy.contains('Logged in as').should('not.exist');
    cy.log('Test case 2 end')

});
