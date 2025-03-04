/// <reference types="cypress" />

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 13: Verify Product quantity in Cart', () => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');

    cy.get('div.choose').first().contains('View Product').click();

    cy.url().should('include', '/product_details/');
    cy.get('.product-information h2').should('be.visible');
    cy.get('input#quantity').clear().type('4');

    cy.get('button.btn-default').contains('Add to cart').click();
    cy.get('.modal-content').find('a[href="/view_cart"]').click();
    cy.get('.cart_quantity').should('contain', '4');
});