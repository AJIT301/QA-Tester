/// <reference types="cypress" />

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 8: Verify All Products and product detail page', () => {

    cy.get('a[href="/products"]').click();

    cy.contains('All Products').should('be.visible');

    cy.get('a[href="/product_details/1"]').click();

    cy.url().should('eq', 'https://automationexercise.com/product_details/1');

    cy.get('h2').contains('Blue Top').should('be.visible');
    cy.get('p').contains('Category: Women > Tops').should('be.visible');
    cy.get('span').contains('Rs. 500').should('be.visible');
    cy.get('p').contains('Availability').should('be.visible');
    cy.get('p').contains('Condition').should('be.visible');
    cy.get('p').contains('Brand').should('be.visible');

});