
//cy.visit()
/// <reference types="cypress" />

it('Create new to do', () => {

    //1. priversti robota suvesti uzduoties pavadinima
    //1.1 turim pasirinkti ir patikrinti ar input egzistuoja
    //1.2 turim ivesti konkretu teksta i input


    //document.querySelector("p");
    //document.querySelector("#id");
    //document.querySelector(".class");

    // document.querySelector("p.header")
    // document.querySelector("h1#header")

    //document.getElementById('id')
    //document.getElementByClass('class') !!!!!!!!!!
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');

    // 1 uzduotis arba bus null
    cy.contains('ul.todo-list li', '1 uzduotis').should('be.visible')
    // cy.get('ul.todo-list li')
    //ar 1 uzduotis li elementas yra matomas
    // cy.get('ul.todo-list li')
    //cypress bando ieskoti elemento li, kurio turinys yra 1 uzduotis


    // cy.get('ul.todo-list li').invoke('text').should('c')
    // Patikrinti ar pirma uzduotis atsidure uzduociu sarase

});

it('Delete new to do', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');

    // sudetingesnis variantas
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').invoke('show');
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').click();

    //paprastesnis variantas
    // cy.contains('ul.todo-list li', 'trinama uzduotis').find('button').click({force: true});
    //mouseover - uzvedus pelyte kazkas atsitinka
    //mosuedown - paspaudus pelytes klavisa
    //mouseup - atleidus pelytes klavisa
    //...

    //ne tik paslepia elementa bet ir istrina jo koda

    // cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.be.visible')
    cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.exist');

    //sita veiksma atliksim po pertraukos



    //susikurti uzduoti x
    //sukurta uzduoti istrinti

})

it('To do item edit', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');


    //document.querySelector

    //contains

    // 2 uzduoti redaguosim
    cy.contains('ul.todo-list li', '2 uzduotis').dblclick();

    //uzduoties laukeli isvalysim ir tada pridesim teksta "redaguota uzduotis"
    cy.contains('ul.todo-list li', '2 uzduotis').find('input.edit').clear().type('redaguota uzduotis{enter}')


    cy.contains('ul.todo-list li', 'redaguota uzduotis').should('be.visible');

    // cy.get('.edit').clear();

})

it('Ar <header> elementas atvaizduojamas', () => {
    //patartina, rekomenduojama kad header elementas svetaineje butu tik vienas
    //<div class="header">
    //<table class="header">
    cy.visit('https://todolist.james.am/#/');
    cy.get('header').should('exist');
    cy.get('header').should('be.visible');
});

it('Ar headeryje(h1 tage) atvaizduojamas tekstas "To Do List"', () => {

    //Ar puslapis matomas vartotojui testas
    //class title/ page-title ...
    //pasirenku headeri
    //teksta kuris yra parasytas h1 tage
    //pagal SEO reikalavimus, h1 tagas irgi turi buti tik 1
    cy.visit('https://todolist.james.am/#/');
    cy.get('header h1').should('exist');
    cy.get('header h1').should('be.visible');

    cy.contains('header h1', 'To Do List').should('be.visible');
    cy.get('header h1').should('have.text', 'To Do List');

});

it("Ar atvaizduojamas 'Double-click to edit a todo' tekstas", () => {
    // 'Double-click to edit a toodo'
    //Ticket Ar atvaizduojamas 'Double-click to edit a todo ne, neatvaizduojama
    // footer svetaineje 1
    cy.visit('https://todolist.james.am/#/');

    //class info <div class="product">
    // <div class="info"> arba <div class="product-description"
    //              </div>

    //id - data-id - elementas.unikalia klase -> elementas
    cy.contains('footer.info p', 'Double-click to edit a toodo').should('exist');
    cy.contains('footer.info p', 'Double-click to edit a toodo').should('be.visible');
    // 'XPath'
    // '/html/body/div[1]/div/main/div/div/div[2]/div[3]/div[2]/div/div'

});
it("Ar input laukelyje atvaizduojamas tekstas 'What need's to be done?'", () => {
    cy.visit('https://todolist.james.am/#/');


    //input tago atributa 'placeholder'

    //pameginti pasirinkti elementa kuris turi placholder atributa ir kurio reiksme yra What need's to be done?
    cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('exist');
    cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('be.visible');
    // cy.get('input.new-todo[placeholder]')
    cy.get('input.new-todo')
        .should('have.attr', 'placeholder', "What need's to be done?")
        .should('be.visible');
});


it("Ar pridėjus kelias užduotis, užduočių sąrašas nėra tuščias", () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');



    //document.querySelectorAll('ul li') - pati pirma ar visus?

    //each


    // cy.get('ul.todo-list li') - gauti visus li elementus esancius ul
    //cy.get jis gauna visus elementus
    //jis gauna visus 6 elementus

    cy.get('ul.todo-list li').each(($el) => {
        cy.log($el)
    })


    const items = [1, 29, 47];// originalus masyvas 
    const squareOfItems = []; // tuscias masyvas

    items.forEach(function (item) {
        squareOfItems.push(item * item); // kuria nauja masyva kur kiekvienas elementas pakeltas 2 laipsniu
    });

    console.log(squareOfItems);

    //es6 naujesne javascript sintakse

    //as dar galiu atlikti testavimus individualiam kiekvieno saraso elementui
    //li elementu masyvas
    cy.get('ul.todo-list li')
        .each(($el, $list) => {
            //turetume galimybe atlikti kazkokius tai veiksmus su individualiu saraso elementu
            //ar elementas netuscias ir t.t.

            //Paspausti kiekviena saraso elementa double click
            $el.dblclick();
        })
        .then(($list) => {
            expect($list).to.have.length(6);
        })


    //atlieku tiesiog bendro ilgio nustatyma
    cy.get('ul.todo-list li').should('have.length', 6);


    //1 variantas
    // pridejus 6 uzduotis
    //suskaiciuoti ul elementu sarasa li elementu turetu buti 6
    //elementu skaicius suskaiciuotu yra lygus ivestu, vadinas testas praejo

    //2 variantas
    //tiesiog tikrinti ar ne tuscias



    //3 variantas tiktrinti
    //uzduociu kiekis yra lygus item left kiekiui, ir sitas nepraeis

});


it('Ar visi redaguojasi elementai', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('ul.todo-list li').each(($el, $list) => {
        $el.dblclick();
    })
});

//elementu skaiciavimo susiskaiciuoti kiek mes turim li saraso elementu

//Svetaine prisijungimas ir registracija
//1.testuoti pacia registracija. Ar galima uzsiregistruoti?
//2. pati prisijungima. Ar galima prisijungti?
//3. Integracinis testas: Ar uzsiregistravus galima prisijungti?
//4. musu rasomas testas tures buti prisijunges prie svetaines, atsiminti kad jis yra prisijunges
//5. Kaip tas pats funkcionalumas yra atvaizduojamas prisijungusiam ir neprisijungusiam vartotojui

//Prisijungimo atsiminmas(sesijos isaugojimas)
//Sesija - serverio atminties vieta, kur svetainė gali išsaugoti informaciją
//Cookie - vieta vartotojo kompiuteryje, kur svetainė gali išsaugoti informaciją

//Kokią info saugau sesijoje? jautrūs duomenys - slaptažodis, prisijungimo vardas, prisijungimo tokenas, asmens informacija...
// Kokią info saugau cookie? viską, išskyrūs jautrią informaciją

//abiem galima nustatyti laiką, kiek jie egzistuoja
//Ar sutinkate su slapukais popup testavimas?
it('Ar svetainė leidžia sukurti sausainiuką?', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.setCookie('test', 'test');
    cy.getCookie('test').should('exist');
})

//Ar informacija isisaugo po svetainės persikrovimo?
//1. Uzeiti i svetaine
//2. Sukurti informacini sausainiuka(JSON masyvas tekstiniame formate, kazkoks skaicius, tekstas ir t.t)
//3. Sukurti kelis sausiuniukus
//3.1 Sausainiuku informacija yra surasoma i div arba i ul ir .t.t
//4. Perkrauti svetaine
//5. Patikrinti ar sausainiukai isliko po perkrovimo

it('Ar informacija isisaugo po svetainės persikrovimo?', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.setCookie('test', '1');
    cy.setCookie('test1', 'test1');
    cy.setCookie('test2', '{user: studentas}');

    cy.reload();
    // cy.visit('https://todolist.james.am/#/');

    //Po reload turim gauti cookie ir patikrinti ar jo vardas egzistuoja
    //set nustatyi, get -gauti
    cy.getCookie('test').should('exist');
    cy.getCookie('test1').should('exist');
    cy.getCookie('test2').should('exist');

    //patikriname cookie reiksmes
    cy.getCookie('test').should('have.property', 'value', '1');
    cy.getCookie('test1').should('have.property', 'value', 'test1');
    cy.getCookie('test2').should('have.property', 'value', '{user: studentas}');

    //galim istrinti rankiniu budu cookies ir patikrinti ar jie nebeegzistuoja
    cy.clearCookies();
    // cy.clearCookie('test')
    cy.getCookie('test').should('be.null');
    cy.getCookie('test1').should('be.null');
    cy.getCookie('test2').should('be.null');
})

//ar visi testai po cookie sukurimo mato cookie?

// it('Uzeina i svetaine ToDoList', () => {
//     cy.visit('https://todolist.james.am/#/');
//     cy.getCookie('test').should('exist');
//     cy.getCookie('test1').should('exist');
//     cy.getCookie('test2').should('exist');
//     //sausainiukas cypress aplinkoje egzistuoja tik tam testui!
// })


//sesija

it('Testas su sesija', () => {
    cy.session('sesija2', () => {
        cy.visit('https://todolist.james.am/#/')
        cy.get('input.new-todo').type('1uzduotis{enter}')
    })
    cy.visit('https://todolist.james.am/#/')
})



it('Delete new to do', () => {
    cy.session('sesija', () => {
        cy.visit('https://todolist.james.am/#/')
        cy.get('input.new-todo').type('trinama uzduotis{enter}');
        cy.get('input.new-todo').type('1uzduotis{enter}');
    })
    cy.visit('https://todolist.james.am/#/')
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').invoke('show');
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').click();
})


//FUNKCIJOS
// ???
it('Testas be sesijos', () => {
    //nauja_komanda
    cy.nauja_komanda('kelios_uzduotys');
})

describe('TodoJamesTestai', () => {
    beforeEach(() => {
        //ivykdoma pries kiekviena testa
        //pries kiekviena testa man reikia sesijos duomenu
        //as kuriu sesija
        //komanda, kuri man kuria sesija
    });
});