/// <reference types="cypress" />


before(() => {

    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});
it('Test Case 17: Remove Products From Cart', () => {
    
    cy.log('Adding products to cart');

    [2, 3, 4].forEach(index => {
        cy.addProductToCart(index);
    });

    cy.log('Navigating to Cart page');
    cy.get('ul.navbar-nav').contains('Cart').click();

    cy.url().should('include', '/view_cart');
    cy.contains('Shopping Cart').should('be.visible');

    [3, 4, 5].forEach(productId => {
        cy.get(`tr#product-${productId}`).should('be.visible');
    });

    cy.log('Removing product with id 4');
    cy.get('a[data-product-id="4"]').click();

    cy.get('tr#product-4').should('not.exist');

    [3, 5].forEach(productId => {
        cy.get(`tr#product-${productId}`).should('be.visible');
    });

    cy.log('Product successfully removed from cart');
});
