

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



it('Test Case 15: Place Order: Register before Checkout', () => {

    cy.signupUser(user);

    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    cy.visit('https://automationexercise.com/');
    cy.get('div.productinfo').eq(1).contains('Add to cart').click();
    cy.get('[data-dismiss="modal"]').click();
    cy.get('div.productinfo').eq(3).contains('Add to cart').click();
    cy.get('[data-dismiss="modal"]').click();
    cy.get('div.productinfo').eq(5).contains('Add to cart').click();
    cy.get('[data-dismiss="modal"]').click();

    cy.get('ul.navbar-nav li').contains('Cart').click();

    cy.url().should('eq', 'https://automationexercise.com/view_cart');
    cy.get('body').should('be.visible');

    cy.get('ul.navbar-nav li').contains('Cart').click();
    cy.contains('Proceed To Checkout').click();

    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    cy.get('textarea[name="message"]').type('Please deliver this order ASAP. Thanks!');
    cy.contains('Place Order').click();

    cy.get('input[data-qa="name-on-card"]').type(user.name);
    cy.get('input[data-qa="card-number"]').type(user.card);
    cy.get('input[data-qa="cvc"]').type(user.cvc);
    cy.get('input[data-qa="expiry-month"]').type(user.expm);
    cy.get('input[data-qa="expiry-year"]').type(user.expy);

    cy.contains('Pay and Confirm Order').click();

    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Delete Account').click();

    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();

    cy.get('body').should('be.visible');
    cy.contains('Signup / Login').should('be.visible')
});