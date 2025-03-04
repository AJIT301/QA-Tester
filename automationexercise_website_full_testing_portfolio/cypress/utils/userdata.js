export const loadJsonWithDemail = async () => {
    const userData = await cy.fixture('users');
    return {
        ...userData,
        email: `testuser${Date.now()}@AJITsolutions.com`, // Dynamic email
    };
};
