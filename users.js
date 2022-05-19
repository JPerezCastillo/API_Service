class User {
    #id;
    name;
    username;
    email;
    phone;
    website;
    company;

    constructor(id, name, username, email, phone, website, company) {
        this.#id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.company = company;
    }
}
const user = new User();
// 1,"Leanne Graham","Bret","Sincere@april.biz","1-770-736-8031 x56442","hildegard.org","Romaguera-Crona"
// console.log(user.id);

class UserApiService {
    #apiUrl;
    constructor(url) {
        this.#apiUrl = url;
    }

    async getUser() {
        try {
            const response = await fetch(this.#apiUrl); 

            if (response.ok) {
                const data = await response.json();

                const user = [];

                data.forEach(element => {
                    user.push(new User(element.id, element.name, element.username, element.email, element.phone, element.website, element.company))
                });
                return user;
            }
            else {
                throw new Error(`API Error with HTTP status: ${response.status}`);
            }
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
   
}

const apiService = new UserApiService("https://jsonplaceholder.typicode.com/users");

apiService.getUser()
.then((result) => {
    console.log(result);
    result.forEach((user) => {
        user.render();
        
    })
   
})
.catch((err) => { });

//generiet list with button
window.onload = () => {
    document.querySelector('#btnSubmit').addEventListener('click', getData);
}

function getData(){
    fetch('https://jsonplaceholder.typicode.com/users') // Anfrage an der Server
    .then(res => res.json())  
   // Datentransformation
    .then(data => {
        let out = '<h2 class = "mt-3 mb-2">Data of Users</h2>' 
        //list
        data.forEach(user => {
            out += `
                <ul class = "list-group mb-3">
                    <li class = "list-group-item text-primary">${user.name}</li>
                    <li class = "list-group-item text-primary">${user.username}</li>
                    <li class = "list-group-item text-secondary">${user.email}</li>
                    <li class ="list-group-item text-secondary">${user.phone}</li>
                    <li class = "list-group-item text-info">${user.website}</li>
                </ul>
            `
            // company erkennt nicht nur als objekt 
        });
        document.querySelector('#result').innerHTML = out;
    })
}

// let table = initTable();
// for (let i = 0; i < user.length; i++) {
//     let user = user[i];
//     let row = createRow(
//         user.name,
//         user.username,
//         user.email,
//         user.phone,
//         user.website,
//         user.company,
//     );
//     table.tBodies[0].appendChild(row);
// }
// document.getElementById("btnCallback").addEventListener("click", () => {
//     initable;
// });

// //Auswerten des umgewandelten JavaScript-Objekts

// function initTable() {
//     let table = document.createElement('table');
//     let tableHeader = document.createElement('thead');

//     let headerRow = document.createElement('tr');
//     let headerColumnName = document.createElement('th');
//     let headerColumnUsername = document.createElement('th');
//     let headerColumnEmail = document.createElement('th');
//     let headerColumnPhone = document.createElement('th');
//     let headerColumnWebsite = document.createElement('th');
//     let headerColumnCompany = document.createElement('th');

//     let tableBody = document.createElement('tbody');
//     headerColumnName.appendChild(document.createTextNode('Name'));
//     headerColumnUsername.appendChild(document.createTextNode('Username'));
//     headerColumnEmail.appendChild(document.createTextNode('Email'));
//     headerColumnPhone.appendChild(document.createTextNode('Phone'));
//     headerColumnWebsite.appendChild(document.createTextNode('Website'));
//     headerColumnCompany.appendChild(document.createTextNode('Company'));

//     tableHeader.appendChild(headerRow);
//     table.appendChild(tableHeader);
//     table.appendChild(tableBody);
//     table.className = 'table table-striped';

//     return table;
    
// }

// function createRow() {
//     let row = document.createElement('tr');

//     let columnName = document.createElement('td');
//     let columnUsername = document.createElement('td');
//     let columnEmail = document.createElement('td');
//     let columnPhone = document.createElement('td');
//     let columnWebsite = document.createElement('td');
//     let columnCompany = document.createElement('td');

//     columnName.appendChild(document.createTextNode(name)); //wieso löscht ?
//     columnUsername.appendChild(document.createTextNode(username));
//     columnEmail.appendChild(document.createTextNode(email));
//     columnPhone.appendChild(document.createTextNode(phone));
//     columnWebsite.appendChild(document.createTextNode(website));
//     columnCompany.appendChild(document.createTextNode(company));

//     row.appendChild(columnName);
//     row.appendChild(columnUsername);
//     row.appendChild(columnEmail);
//     row.appendChild(columnPhone);
//     row.appendChild(columnWebsite);
//     row.appendChild(columnCompany);

//     return row;
// }

