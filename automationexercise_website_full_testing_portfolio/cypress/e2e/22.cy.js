/// <reference types="cypress" />

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 22: Add to cart from Recommended items and proceed to checkout', () => {

    cy.visit('https://automationexercise.com');

    cy.scrollTo('bottom');

    cy.get('h2.title.text-center').contains('recommended items').should('be.visible');


    cy.get('#recommended-item-carousel .carousel-inner .item.active')
        .find('a.add-to-cart')
        .first()
        .should('be.visible')
        .click();

    cy.get('#cartModal').should('be.visible');
    cy.get('[data-dismiss="modal"]').click({ multiple: true });
    cy.get('a[href="/view_cart"]').contains('View Cart').click({ force: true });

    cy.url().should('include', '/view_cart');
    cy.get('#cart_info').should('be.not.be.empty');

    cy.get('#cart_info', { timeout: 100 }).should('be.visible');

    cy.get('#cart_info_table').should('contain', 'Stylish Dress');
    cy.get('.cart_total_price').should('contain', 'Rs. 1500');

    cy.get('.check_out').should('be.visible').click();

    cy.get('#checkoutModal').should('be.visible');
    cy.contains('Register / Login').should('be.visible');

});
