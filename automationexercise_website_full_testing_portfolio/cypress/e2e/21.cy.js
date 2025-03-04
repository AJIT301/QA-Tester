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

it('Test Case 21: Add Review on Product', () => {

    cy.get('ul.navbar-nav').contains('Products').click();
    cy.url().should('include', '/products');

    cy.viewProductAndAddReview();

    cy.submitProductReview('John Doe', 'AJTsol@example.com', 'Great product. Had a pleasure testing it');

    cy.contains('Thank you for your review.').should('be.visible');

    cy.visit('https://automationexercise.com/')

    cy.log('21 Test case completed.')

});


