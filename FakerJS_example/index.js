// npm init
// npm install @faker-js/faker
//node index.js paleidimui
//npm install fs

//https://www.npmjs.com/package/@faker-js/faker
//https://fakerjs.dev/api/

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const readline = require('readline');

//Sugeneruoti netikra varda ir pavarde
let randomName = faker.person.firstName();
let randomSurname = faker.person.lastName();

//sugeneruoti 100 netikru users/people, su siais duomenimis
// vardas
// pavarde
//telefono numeris
//email
//username
//password
//netikra gimimo data


function jsonToCSV(jsonArray) {
    //Primityvi ir labai paprasta
    const csvHeader = Object.keys(jsonArray[0]).join(',') + '\n';
    let csvRows = "";
    
    for (let i=0; i< jsonArray.length; i++) {
        let csvRow = Object.values(jsonArray[i]).join(',') + '\n';
        csvRows += csvRow;
    }

    return csvHeader + csvRows;

}
function generateUser() {
    return {
        "name": faker.person.firstName(),
        "surname": faker.person.lastName(),
        "phone": faker.phone.number(),
        "email": faker.internet.email(),
        "username": faker.internet.username(),
        "password": faker.internet.password(),
        "birthdate": faker.date.past() //data praeityje
    }
}

function generateProduct() {
    return {
        "title": faker.commerce.product(),
        "description": faker.commerce.productDescription(),
        "price": faker.commerce.price()
    }
}

function generateCategory() {
    return {
        "title": faker.commerce.department(),
        "description": faker.commerce.productDescription()
    }
}

function generateToy() {
    return {
        "title": faker.commerce.product(),
        "description": faker.commerce.productDescription(), 
        "price" : faker.commerce.price()
    }
}

function generateCompany() {
    return {
        "title": faker.commerce.department()
    }
}


//ziurek as nuskaitinesiu is terminalo duomenis

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.question("Kiek duomenu noretumete suvesti i kiekviena is duomenu failu? \n", (dataCount) => {
    // console.log(dataCount);


    


//Susikurti daug(100 users) duomenu objektu

// 11:08 - 11:18

// isisaugoti duomenis i duomenu failus. json ir csv
//lengvai pakeisti generuojamu duomenu kieki
//node index.js
//Klausimas: kiek duomenu norite kad kiekviename faile butu?
//10
//Papildomai: kuriuos failus norit generuoti? users/products/categories/toys/companies
const users = Array.from({length: dataCount}, generateUser);
const products = Array.from({length:dataCount}, generateProduct );
const categories = Array.from({length:dataCount}, generateCategory );
const toys = Array.from({length:dataCount}, generateToy );
const companies = Array.from({length:dataCount}, generateCompany);

//users turim pasiversti i paprasta teksta
fs.writeFileSync('json/users.json', JSON.stringify(users, null, 4));
fs.writeFileSync('json/products.json', JSON.stringify(products, null, 4));
fs.writeFileSync('json/categories.json', JSON.stringify(categories, null, 4));
fs.writeFileSync('json/toys.json', JSON.stringify(toys, null, 4));
fs.writeFileSync('json/companies.json', JSON.stringify(companies, null, 4));

// JSON
// {
    // "name": "Kasey",
    // "surname": "Kilback",
    // "phone": "(724) 789-0129 x7685",
    // "email": "Tianna_McLaughlin@hotmail.com",
    // "username": "Reuben.Stamm",
    // "password": "Xno0gTMtYShZ1RV",
    // "birthdate": "2024-08-01T16:06:18.261Z"
// }

//CSV
// name, surname, phone, email, username, password, birthdate  //headeris
//Kasey, Kilback, (724) 789-0129 x7685, Tianna_McLaughlin@hotmail.com, Reuben.Stamm, Xno0gTMtYShZ1RV, 2024-08-01T16:06:18.261Z

const csvHeader = Object.keys(users[0]).join(',') + '\n';
let csvRows = "";

// const csvRows = users.map(user => 
//     Object.values(user).map(value => 
//       typeof value === 'object' ? JSON.stringify(value).replace(/,/g, ';') : value
//     ).join(',')
//   ).join('\n');

for (let i=0; i< users.length; i++) {
    let csvRow = Object.values(users[i]).join(',') + '\n';
    csvRows += csvRow;
}
//irasau csvHeader ir viena csvRow
fs.writeFileSync('csv/users.csv', jsonToCSV(users) );
fs.writeFileSync('csv/products.csv', jsonToCSV(products) );
fs.writeFileSync('csv/categories.csv', jsonToCSV(categories) );
fs.writeFileSync('csv/toys.csv', jsonToCSV(toys) );
fs.writeFileSync('csv/companies.csv', jsonToCSV(companies) );


// console.log(csvHeader)
console.log("Failai sugeneruoti su "+dataCount + " irasu")

// console.log(users)
// console.log(users.length)
// Primityvus generavimas
// const users = [];
// for(let i=0; i< 100; i++) {
//     let user = {
//         "name": faker.person.firstName(),
//         "surname": faker.person.lastName(),
//         "phone": faker.phone.number(),
//         "email": faker.internet.email(),
//         "username": faker.internet.username(),
//         "password": faker.internet.password(),
//         "birthdate": faker.date.past() //data praeityje
//     };

//     users.push(user)
// } 

// console.log(users)

// console.log(randomName);
// console.log(randomSurname);
// console.log(user);
// console.log(product);
// console.log(category)
// console.log(toy)
rl.close();
});