/// <reference types="cypress" />

before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 9: Search Product', () => {

    cy.get('a[href="/products"]').click();

    cy.contains('All Products').should('be.visible');

    cy.get('input#search_product').type('Jeans');
    cy.get('button#submit_search').click();

    cy.contains('Searched Products').should('be.visible');

    cy.get('.productinfo p').each($e => {
        cy.wrap($e).should('contain', 'Jeans');
    });

});
