//uzkrauti duomenu faila ir cy.loge atvaizduoti duomenis

/// <reference types="cypress" />


it('Fixtures works', () => {
    // / fixtures/users.json
    cy.fixture('users').as('usersJson').then((users)=> {
        cy.log(users)
    });

    // fixtures/users.json
    cy.fixture('example').as('exampleJson').then((example) => {
        cy.log(example)
    }); //fixtures/example.json
    cy.fixture('products').as('productsCsv').then((products) => {
        cy.log(products)
    }) 
    //fixtures/products.csv
    // cy.fixture('productsssssssssssss') //fixtures/productsssssssssssss.csv nera
});

//1 uzduotis, 2 uzduotis, 3 uzduotis, n+1 uzduotis
//uzduotis, uzduotis, uzduotis


//Jeigu mes turime duomenų generavimo kodą, jį paleidžiam vieną kartą ir UŽKOMENTUOJAM !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
it('Duomenu generavimas', () => {
    let tasks = [];
    for(let i = 1; i<=100; i++) {
        tasks.push(i + " uzduotis");
    }
    console.log(tasks);
    //2 parametrai: kur irasau faila, ir ka irasau i faila
    cy.writeFile("cypress/fixtures/todos.json", { "todos": tasks});
})

it('100 todos suvedimas i ToDoJames svetaine',() => {
    //suvedame 100 uzduociu
    //ir suskaiciuojam ar tikrai 100 uzduociu susivede

    //1. Uzeiname i todojames svetaine
    //2. gauname input
    //3. suvedame uzduoti
    //4. paspaudziame enter
    //5. grizatam i 2 zingsni dar 99 kartus

    //duomenu suvedimas su ciklu
        // for(let i = 1; i<=100; i++) {
            // cy.get('input.new-todo').type( i +' uzduotis{enter}');
        // }

    cy.session("fixture_sesija", () => {
        cy.visit('https://todolist.james.am/#/');
        cy.fixture('todos.json').as('Todos').then((todosFile) => {
            //duomenu struktura
            //kiek mes turim duomenu
            
            //atvaizduoja visus todos
            cy.log(todosFile); //visa faila
            //kaip atvaizduoti tik konkretu duomeni. Kaip cy.loge parodyti 55 uzduotis?
            cy.log(todosFile.todos[54]);
            //jei mes galime pasirinkti konkretu duomeni, mes galime pasirinkti ir i duomeni

            //1 budas
            // for(let i=0; i < todosFile.todos.length - 1; i++) {
            //     cy.get('input.new-todo').type( todosFile.todos[i] +'{enter}');
            // }

            //2 budas
            todosFile.todos.forEach((todo) => {
                cy.get('input.new-todo').type( todo +'{enter}');
            })
            //Kokiu paprasciausiu budu dabar mes galime istestuoti, kad visi 100 elementu yra sarase?
            
            //patikrinti ar yra bent vienas elementas sarase tarp 1 ir masyvo ilgio
            //patikrinti ar yra  1 ir paskutinis elementai
            //ul li elementu ilgis turi buti masyvo ilgis
            cy.get('ul.todo-list li').should('have.length', todosFile.todos.length );
        });
    });
    cy.visit('https://todolist.james.am/#/'); 
    
    //ul li elementu ilgis turi buti 100
    cy.get('ul.todo-list li').should('have.length', 100);

})

//1.TodoJames svetaine, mes galime pasidaryti faila todojames.json, sukurti 100 todos ir juos suvesti i uzuodciu sarasa. 
//2.Fixture(duomenu faila) panaudoti intercepte. Mes viena html,js faila keiciame kitu. GoSign iframe mes ji galime periimti ir iterpi savo html
//3.Saugumo testas. Mini brute force ataka. 1000 vartotoju. Kas 1sekunde bando prisijungti
//7 bandymu prisijungti svetaine nebeleidzia jungtis