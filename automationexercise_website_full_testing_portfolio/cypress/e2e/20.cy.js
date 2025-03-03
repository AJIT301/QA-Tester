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

it('Test Case 20: Search Products and Verify Cart After Login', () => {

    cy.get('ul.navbar-nav').contains('Products').click();

    cy.url().should('include', '/products');

    const productName = 'Jeans';

    cy.searchProduct(productName);
    cy.addAllSearchedProductsToCart(productName);

    cy.get('ul.navbar-nav').contains('Cart').click();
    cy.verifyProductsInCart(productName);

    cy.signupUser(user);

    cy.contains('Logged in as').should('be.visible').and('contain', user.name);
    cy.get("ul.nav > li > a[href='/view_cart']").click();
    // cy.get('ul.navbar-nav').contains('Cart').click();
    cy.verifyProductsInCart(productName);

    cy.deleteUserAccount();
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Signup / Login').should('be.visible');
});

