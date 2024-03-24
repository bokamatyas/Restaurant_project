import Backend from "./backend.js";

type Role = "guest" | "admin";

interface User{
    id?: number,
    name: string,
    role: Role,
    password: string
}

export default class Login{
    BACKEND = new Backend();

    Button_login = document.querySelector('.login') as HTMLButtonElement;
    constructor(){
        this.Button_login.addEventListener('click', this.login);
    }

    login = async (e: Event)=>{
        e.preventDefault();
        this.Button_login.disabled = true;

        let users: Array<User> = await this.BACKEND.getData('users');

        let _name = (document.querySelector('#nameField') as HTMLInputElement).value;
        let _password = (document.querySelector('#passField') as HTMLInputElement).value;        

        users.forEach(user => {
            if(user.name == _name && user.password == _password){                
                window.localStorage.setItem('LoggedIn', 'true');            
                window.localStorage.setItem('UserName', _name);            
                (document.querySelector('#shortcut') as HTMLLinkElement).click();
            }                        
        });
        this.Button_login.disabled = false;
    }
}