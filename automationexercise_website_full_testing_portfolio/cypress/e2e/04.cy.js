

/// <reference types="cypress" />

it('Test Case 4: Logout User', () => {

cy.login_static();
cy.contains('Logged in as').should('be.visible');
cy.logoutUser();
cy.contains('Logged in as').should('not.exist');
// cy.contains('Login to your account').should('be.visible');

});