import Backend from "./backend.js";
export default class Login {
    constructor() {
        this.BACKEND = new Backend();
        this.Button_login = document.querySelector('.login');
        this.login = async (e) => {
            e.preventDefault();
            this.Button_login.disabled = true;
            let users = await this.BACKEND.getData('users');
            let _name = document.querySelector('#nameField').value;
            let _password = document.querySelector('#passField').value;
            users.forEach(user => {
                if (user.name == _name && user.password == _password) {
                    window.localStorage.setItem('LoggedIn', 'true');
                    window.localStorage.setItem('UserName', _name);
                    document.querySelector('#shortcut').click();
                }
            });
            this.Button_login.disabled = false;
        };
        this.Button_login.addEventListener('click', this.login);
    }
}
