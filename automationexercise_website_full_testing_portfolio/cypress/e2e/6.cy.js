

/// <reference types="cypress" />
before(() => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
});

it('Test Case 6: Contact Us Form', () => {

    cy.get('a[href="/contact_us"]').click();

    cy.contains('Get In Touch').should('be.visible');

    cy.get('input[data-qa="name"]').click().type('AJTester301');
    cy.get('input[data-qa="email"]').click().type('asdasdasd1gb1@gmail.com');
    cy.get('input[data-qa="subject"]').click().type('Critical bug found in your API');
    cy.get('textarea[data-qa="message"]').click().type('The bug which will destroy your database if not fixed correctly. Contact us via email');

    cy.get('input[name="upload_file"]').attachFile('bug.jpg');

    cy.get('input[data-qa="submit-button"]').click();

    cy.on('window:confirm', (text) => {
        expect(text).to.equal('Press OK to proceed!');
        return true;
    });

    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');

    cy.get('a.btn-success').click();

    cy.url().should('eq', 'https://automationexercise.com/');

});
