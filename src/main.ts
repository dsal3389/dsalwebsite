/**
 * this website is build from 0, no framework like angular, react, vue
 * pure js (well its written in ts because its better, but its still converted to js at the end)
 * 
 * the website has the angular like syntax, because ATM of writing this I know only angular,
 * and I really like angular, so yeah
 * 
 * there are no modules or validation checks because I am the only one writing the code here
 */
import './styles/main.scss';
import { Router } from './scripts/router';


declare global{
    interface Window{
        setTheme: any;
    }
}


const appRouter = new Router([
    {path: 'home', handler: import('./scripts/handlers/home').then(h => h.HomeHandler)},
    {path: 'contact', handler: import('./scripts/handlers/contact').then(h => h.ContactHandler)}
]);


const copyURLbtn = document.getElementById('current-url-btn')!;
copyURLbtn.addEventListener('click', (e) => {
    const inp = <HTMLInputElement>document.createElement('input');
    inp.value = appRouter.absolutePath;

    document.body.appendChild(inp);
    inp.select();

    document.execCommand('copy');
    document.body.removeChild(inp);
});


window.setTheme = (theme: string) => {
    document.documentElement.className=theme;
}

