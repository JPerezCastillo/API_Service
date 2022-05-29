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

