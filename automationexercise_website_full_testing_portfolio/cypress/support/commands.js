// cypress/support/commands.js

import 'cypress-file-upload';

Cypress.Commands.add('loadUserWithDynamicEmail', () => {
    return cy.fixture('users').then((userData) => {
        const user = {
            ...userData,
            email: `testuser${Date.now()}@AJTsolutions.com` // Dynamic email with random numbers.
        };
        return cy.wrap(user);
    });
});


//statinis acc, netrinamas.
Cypress.Commands.add('login_static', () => {
    const user = {
        email: 'asdasdasd1gb1@gmail.com',
        password: 'AJtest3301AJtest3301',
    };

    cy.visit('https://automationexercise.com/login');
    cy.url().should('eq', 'https://automationexercise.com/login');
    cy.get('.login-form').contains('Login to your account').should('be.visible');

    cy.get('input[data-qa="login-email"]').type(user.email);
    cy.get('input[data-qa="login-password"]').type(user.password);

    cy.get('button[data-qa="login-button"]').click();

    cy.contains('Logged in as').should('be.visible');
});

//random acc kurimas "disposable acc"
Cypress.Commands.add('signupUser', (user) => {
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();
    cy.url().should('eq', 'https://automationexercise.com/login');
    cy.get('input[data-qa="signup-name"]').type(user.name);
    cy.get('input[data-qa="signup-email"]').type(user.email);
    cy.get('button[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');
    cy.get('input#id_gender1').check();
    cy.get('input[data-qa="password"]').type(user.password);

    cy.get('select#days').select(user.day);
    cy.get('select#months').select(user.month);
    cy.get('select#years').select(user.year);

    cy.get('input#newsletter').check();
    cy.get('input#optin').check();

    cy.get('input[data-qa="first_name"]').type(user.firstName);
    cy.get('input[data-qa="last_name"]').type(user.lastName);
    cy.get('input[data-qa="company"]').type(user.company);
    cy.get('input[data-qa="address"]').type(user.address1);
    cy.get('input[data-qa="address2"]').type(user.address2);
    cy.get('select[data-qa="country"]').select(user.country);
    cy.get('input[data-qa="state"]').type(user.state);
    cy.get('input[data-qa="city"]').type(user.city);
    cy.get('input[data-qa="zipcode"]').type(user.zipcode);
    cy.get('input[data-qa="mobile_number"]').type(user.mobile);

    cy.get('button[data-qa="create-account"]').click();
    cy.get('a[data-qa="continue-button"]').click();
});

//login
Cypress.Commands.add('loginUser', (user) => {
    cy.get('ul.navbar-nav li').contains('Signup / Login').click();
    cy.url().should('eq', 'https://automationexercise.com/login');
    cy.get('input[data-qa="login-email"]').type(user.email);
    cy.get('input[data-qa="login-password"]').type(user.password);
    cy.get('button[data-qa="login-button"]').click();
});

Cypress.Commands.add('logoutUser', () => {
    cy.contains('Logout').click();
});

Cypress.Commands.add('deleteUserAccount', () => {
    cy.get('a[href="/delete_account"]').should('be.visible').click();
    cy.contains('Account Deleted!').should('be.visible');
    cy.get('h2.title').should('contain', 'Account Deleted');
    cy.get('a.btn-primary').click();

});

Cypress.Commands.add('setStaticUser', () => {
    Cypress.env('sname', 'AJIT3301');
    Cypress.env('spass', 'AJtest3301AJtest3301');
    Cypress.env('semail', 'asdasdasd1gb1@gmail.com');
});

Cypress.Commands.add('addProductToCart', (index) => {
    cy.get('div.productinfo').eq(index).contains('Add to cart').click();
    cy.get('[data-dismiss="modal"]').click();
    cy.log(`Product at index ${index} added to cart`);
});

Cypress.Commands.add('selectCategory', (mainCategory, subCategory) => {
    cy.log(`Selecting ${mainCategory} -> ${subCategory}`);
    cy.get('div.panel-heading').contains(mainCategory).click();
    cy.get(`#${mainCategory} li`).contains(subCategory).click();

    cy.url().then(url => cy.log(`Navigated to: ${url}`));
});


Cypress.Commands.add('selectBrandAndVerify', (brandName) => {
    cy.log(`Selecting brand: ${brandName}`);
    cy.get('div.brands-name li').contains(brandName).click();

    cy.contains(`Brand - ${brandName} Products`).should('be.visible');

    cy.url().then(url => cy.log(`Navigated to: ${url}`));
});

Cypress.Commands.add('verifyProductsInCart', (productName) => {
    cy.get('tbody tr').each(($row) => {
        cy.wrap($row).should('contain', productName);
    });
});

Cypress.Commands.add('addAllSearchedProductsToCart', (productName) => {
    cy.get('.productinfo').each(($p) => {
        cy.wrap($p).should('contain', productName);
        cy.wrap($p).contains('Add to cart').click();
        cy.get('[data-dismiss="modal"]').click();
    });
});

Cypress.Commands.add('searchProduct', (productName) => {
    cy.get('input#search_product').type(productName);
    cy.get('button#submit_search').click();
    cy.contains('Searched Products').should('be.visible');
});

Cypress.Commands.add('submitProductReview', (name, email, reviewText) => {
    cy.get('input#name').type(name);
    cy.get('input#email').type(email);
    cy.get('textarea#review').type(reviewText);
    cy.get('#button-review').should('be.visible').click();
});

Cypress.Commands.add('viewProductAndAddReview', () => {
    
    cy.get('a[href^="/product_details"]')
        .first()
        .should('be.visible')
        .contains('View Product')
        .click();

    cy.contains('Write Your Review').should('be.visible');
});