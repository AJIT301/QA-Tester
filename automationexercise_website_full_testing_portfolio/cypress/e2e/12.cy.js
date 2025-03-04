/// <reference types="cypress" />

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 12: Add Products in Cart', () => {
    
    cy.get('ul.navbar-nav li').contains('Products').click();

    cy.get('.productinfo').first().trigger('mouseover');
    cy.contains('Add to cart').first().click();
    cy.get('[data-dismiss="modal"]').click(); // Close modal

    cy.get('.productinfo').eq(1).trigger('mouseover');
    cy.get('.productinfo').eq(1).within(() => {
        cy.contains('Add to cart').click();
    });
    
    cy.get('div.modal-body a[href="/view_cart"]').click();

    // Verify products in cart
    const cartItems = [
        { selector: '#product-1', name: 'Blue Top', price: 'Rs. 500', quantity: '1', total: 'Rs. 500' },
        { selector: '#product-2', name: 'Men Tshirt', price: 'Rs. 400', quantity: '1', total: 'Rs. 400' }
    ];

    cartItems.forEach(({ selector, name, price, quantity, total }) => {
        cy.get('tbody').contains(name).should('be.visible');
        cy.get(`${selector} .cart_price`).contains(price);
        cy.get(`${selector} .cart_quantity`).contains(quantity);
        cy.get(`${selector} .cart_total`).contains(total);
    });

    cy.log('Test case 12 completed.');
});
