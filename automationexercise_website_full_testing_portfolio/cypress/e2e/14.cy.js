/// <reference types="cypress" />

let user;

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    // Use `then()` to ensure the user data is available before moving on
    cy.loadUserWithDynamicEmail().then((userData) => {
        user = userData;
    });
});

describe('Test Case 14: Place Order and Delete Account', () => {

    it('should successfully place an order and delete the account', function () {

        cy.wrap(user).should('exist');


        cy.get('div.productinfo').eq(2).contains('Add to cart').click();

        cy.get('.modal-content').should('be.visible');
        cy.get('[data-dismiss="modal"]').click();

        cy.get('div.productinfo').eq(3).contains('Add to cart').click();


        cy.get('.modal-content').should('be.visible');
        cy.get('[data-dismiss="modal"]').click();


        cy.get('ul.navbar-nav li').contains('Cart').click();

        cy.url().should('eq', 'https://automationexercise.com/view_cart');
        cy.get('body').should('be.visible');

        cy.get('div.container').contains('Proceed To Checkout').click();
        cy.get('div.modal-body a').contains('Register / Login').click();

        cy.signupUser(user);
        // cy.get('[data-qa="continue-button"]').click();

        cy.contains(`Logged in as ${user.name}`).should('be.visible');

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
        cy.get('a[data-qa="continue-button"]').click();

        cy.deleteUserAccount();
        cy.get('a[data-qa="continue-button"]').click();
        cy.log('Test case 14 completed.')
    });

});
