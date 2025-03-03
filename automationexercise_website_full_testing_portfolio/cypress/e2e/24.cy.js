/// <reference types="cypress" />

const fs = require('fs');
const path = require('path');
let user;

before(() => {
    cy.loadUserWithDynamicEmail().then((userData) => {
        user = userData;
    });
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 24: Verify that cart page is displayed', () => {
    // Step 4: Add products to cart
    [3, 5, 7].forEach(index => {
        cy.addProductToCart(index);
    });

    // Step 5: Click 'Cart' button
    cy.get('a[href="/view_cart"]').first().click();

    // Step 6: Verify that cart page is displayed
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info').should('be.visible');

    // Step 7: Click Proceed To Checkout
    cy.get('a.btn.btn-default.check_out').should('be.visible').click();

    // Step 8: Handle the modal that's covering the login link
    cy.get('body').then(($body) => {
        if ($body.find('#checkoutModal.modal.show').length > 0) {
            cy.get('#checkoutModal a[href="/login"]').click();
        } else {
            cy.visit('https://automationexercise.com/login');
        }
    });

    // Proceed with signup
    cy.signupUser(user);

    // Verify logged in as the user
    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    // Step 12: Click 'Cart' button
    cy.get('a[href="/view_cart"]').first().click();

    // Step 13: Click 'Proceed To Checkout' button
    cy.get('a.btn.btn-default.check_out').should('be.visible').click();

    // Step 14: Verify Address Details and Review Your Order
    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_invoice').should('be.visible');
    cy.get('#cart_info').should('be.visible');

    // Step 15: Enter description in comment text area and click 'Place Order'
    cy.get('textarea.form-control').type('Please deliver during business hours');
    cy.get('a.btn.check_out').should('be.visible').click();

    // Step 16: Enter payment details
    cy.get('input[name="name_on_card"]').type('John Doe');
    cy.get('input[name="card_number"]').type('4242424242424242');
    cy.get('input[name="cvc"]').type('123');
    cy.get('input[name="expiry_month"]').type('12');
    cy.get('input[name="expiry_year"]').type('2030');

    // Step 17: Click 'Pay and Confirm Order' button
    cy.get('#submit').click();

    // Step 18: Verify success message
    cy.get('[data-qa="order-placed"]')
        .siblings('p')
        .should('contain', 'Congratulations! Your order has been confirmed!');

    // Step 19: Click 'Download Invoice' button and verify invoice is downloaded
    cy.intercept('GET', '/download_invoice/**').as('downloadInvoice');
    cy.get('.check_out').click();
    cy.wait('@downloadInvoice').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });

    // Verify the file is downloaded
    const downloadsFolder = Cypress.config('downloadsFolder');
    const fileName = 'invoice.txt';
    const filePath = path.join(downloadsFolder, fileName);
    cy.readFile(filePath).should('exist');

    // Step 20: Click 'Continue' button
    cy.get('a.btn-primary').click();
    cy.deleteUserAccount();

    cy.log("Test case 24 completed.")
});