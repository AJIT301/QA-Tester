
/// <reference types="cypress" />


it('Request, intercept, visit',() => {

  //API

  //pagal musu duomenis pateiktus, kreipiasi i url, ir grazina informacija is to url
  cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
      // expect(response.status).to.be.eq(200); //ar status kodas 200
  });

  //Internetinė svetainė
  //pasakom narsyklei kad ji uzeitu i svetaine
  cy.visit('https://todolist.james.am/#/') // tiesiog uzeinu i svetaine

  //perimti
  //sis metodas dazniau naudojamas API, kai API kviečia naršyklė!!!!

  //pagal musu pateiktus duomenis, kreipiames i url, mes ja perimamam ir ja galime sumanipuliuoti
  cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/104"); //sita nuoroda man grazina 404/ post kurio id=104
  //mes galime pasidaryti savo respone
  //kokiai nors nuorodai(url) suteikiam savo/iškarto numatytą atsakymą - mock arba stub


});

it('Get a post/mock a post',() => {

  //Gauti originalu post kurio id = 1
  // cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
  //     cy.log(response.body)
  // });

  //Sumanipuliuoti, perimti post kurio id = 1
  // {userId: 104, title: 'perimtas pavadinimas', id:104}
  // cy.intercept('GET', "https://jsonplaceholder.typicode.com/posts/1", {body: {userId: 104, title: 'perimtas pavadinimas', id:104}}).as('getPostMock');
  
  //X integracija elektronineje parduotuveje
  //Elektronine parduotuve daro kreipimus i Paysera API
  // api/payment; api/orderId ...
  //Kol imone su x nepasiraso sutarties, tol niekas neveikia 
  //su intercept visas x API url apsrasau pats


  //jeigu svetainės backend ir frontend yra atskirti
  //localhost:3000/login frontend - ivedimas i input laukelius, mygtuko paspaudimas ir kokie error grizta
  //localhost:3001/login backend(API)
  //interceptinti localhost:3001/login stebeti ir laukti kol ji ivyks kad mes galetume atlikti testavimą

  cy.intercept('GET', "https://media.ethicalads.io/media/client/ethicalads.min.js", {
    statusCode: 201,
    body: {userId: 104, title: 'perimtas pavadinimas', id:104}}).as('getPostMock');

  cy.visit("https://jsonplaceholder.typicode.com");
  cy.get('#run-button').click();
  cy.wait('@getPostMock');

  //Taip nedaryti
  cy.request('GET','https://jsonplaceholder.typicode.com/todos/1').then(
    (response) => {

      const stubbedBody = {id: 15, username: 'test'};
      response.body = stubbedBody;  
      cy.log(response.body);
      /////
    }
  );
  /////
  
  // cy.intercept('https://jsonplaceholder.typicode.com/todos/1', (req) => {
  //     // req.continue() with a callback will send the request to
  //     // the destination server
  //     req.continue((res) => {
  //       // 'res' represents the real destination response
  //       // you can manipulate 'res' before it's sent to the browser
  //       cy.log(res)
  //     })
  //   })
  
  //neivyksta jokia uzklausta timeout


  // cy.visit('https://jsonplaceholder.typicode.com/posts/1')// Cia yra API nuoroda, netinkami headeriai narsykle negali uzeiti
  
  
  
  // cy.intercept('GET', "https://jsonplaceholder.typicode.com/posts/1",{body:{userId: 104, title: 'perimtas pavadinimas', id:104}}).as('getPostMock');
  // cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
  //     cy.log(response.body)
  // });

  //cy.intercept NEREAGUOJA i cy.request
  //cy.intercept reaguoja tik i cy.visit


  // cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1');
  
  
  // cy.wait('@getPostMock').its('response.body').should('exist');

});