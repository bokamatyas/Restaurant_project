import Backend from "./backend.js";
import Login from "./login.js";
import Menu from "./menu.js";
import Orders from "./orders.js";

// default url
const BASE_URL = 'https://bokamatyas.github.io/Restaurant_project';
// oldalak helye:
const rootDiv: any = document.querySelector('#root');
// nav-ok:
const navs = document.querySelectorAll('a[data-href]');
// console.log(navs);

//route-ok
const routes: any = {
    '/'         : {html : './pages/home.html', code : null},    
    '/menu'         : {html : './pages/menu.html', code : Menu},    
    '/orders'         : {html : './pages/orders.html', code : Orders},    
    '/login'         : {html : './pages/login.html', code : Login},    
       
    '/404' : {html : './pages/404.html', code : null}
}

// oldalak betöltése
const loadPage = async (page: any)=>{
    const response = await fetch(page.html);
    const resHTML = response.text(); // szöveggé konvertálás
    return resHTML;
}

// dinamikus osztály példányosítás
const dynamicClass = (page: any) => {
    if (page.code != null){
        const dynamicClassName = eval(page.code);
        new dynamicClassName();
    }
}

// function onNavClick(){
// }
const onNavClick = async (event: any)=>{
    event.preventDefault(); // megakadályozza az oldal újratöltését
    // console.log(event.target.dataset.href);
    const pathName = event.target.dataset.href;
    const data = await loadPage(routes[pathName]);
    rootDiv.innerHTML = data;
    window.history.pushState({},'',window.location.origin + BASE_URL + pathName);
    //console.log(window.location);
    dynamicClass(routes[pathName]);
}

// windows.history alapján frissítés
window.addEventListener('popstate',async ()=>{
    // console.log(window.location.pathname);
    const routePath = window.location.pathname.slice(BASE_URL.length,window.location.pathname.length);
    // console.log(routePath);
    let data;
    if (routePath in routes){
        data = await loadPage(routes[routePath]);
    } else {
        // nem létező oldal
        data = await loadPage(routes['/404']);
    }
    rootDiv.innerHTML = data;
    
    dynamicClass(routes[routePath]);
});

// F5 frissítés
window.addEventListener('load', async ()=>{
    const routePath = window.location.pathname.slice(BASE_URL.length,window.location.pathname.length);
    let data;
    if (routePath in routes){
        data = await loadPage(routes[routePath]);
    } else {
        // nem létező oldal
        data = await loadPage(routes['/404']);
    }
    rootDiv.innerHTML = data;
        
    let NavLink_Login = document.querySelector('#login') as HTMLLinkElement;
    if(localStorage.getItem('LoggedIn') == undefined ||
    localStorage.getItem('LoggedIn') == "false" ){
        NavLink_Login.innerText = "Login";
    }else{
        NavLink_Login.innerText = (String)(localStorage.getItem('UserName'));
    }

    dynamicClass(routes[routePath]);
})

// eseménykezelés
navs.forEach(nav =>{
    nav.addEventListener('click',onNavClick);
})
