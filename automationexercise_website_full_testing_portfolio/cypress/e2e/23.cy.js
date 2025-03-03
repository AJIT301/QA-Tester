/// <reference types="cypress" />
// Test Case 23: Verify address details in checkout page
// 12. Verify that the delivery address is same address filled at the time registration of account
// 13. Verify that the billing address is same address filled at the time registration of account
// 14. Click 'Delete Account' button
// 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button

let user;

before(() => {
    cy.loadUserWithDynamicEmail().then((userData) => {
        user = userData;
    });
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 23: Verify address details in checkout page', () => {

    cy.signupUser(user);

    cy.contains(`Logged in as ${user.name}`).should('be.visible');

    [1, 2, 3].forEach(index => {
        cy.addProductToCart(index);
    });

    // cy.get('ul.navbar-nav').contains('Cart').click();
    cy.get("ul.nav > li > a[href='/view_cart']").click();
    cy.url().should('include', '/view_cart');
    cy.get('.cart_description').should('be.visible');

    cy.get('.check_out').click();

    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_delivery .address_firstname').should('contain', user.firstName);
    cy.get('#address_delivery .address_lastname').should('contain', user.lastName);
    cy.get('#address_delivery .address_address1').should('contain', user.address1);
    cy.get('#address_delivery .address_city').should('contain', user.city);
    cy.get('#address_delivery .address_country_name').should('contain', user.country);
    cy.get('#address_delivery .address_phone').should('contain', user.mobile);

    cy.get('#address_invoice').should('be.visible');
    cy.get('#address_invoice .address_firstname').should('contain', user.firstName);
    cy.get('#address_invoice .address_lastname').should('contain', user.lastName);
    cy.get('#address_invoice .address_address1').should('contain', user.address1);
    cy.get('#address_invoice .address_city').should('contain', user.city);
    cy.get('#address_invoice .address_country_name').should('contain', user.country);
    cy.get('#address_invoice .address_phone').should('contain', user.mobile);

    cy.deleteUserAccount();
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logged in as').should('not.exist');

});