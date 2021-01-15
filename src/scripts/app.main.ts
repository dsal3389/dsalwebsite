/**
 * all of the stuff that required to be shared will
 * be in the app Object
 */
import { Router } from './router';

class App{
    private router_: Router;

    constructor(){
        this.router_ = new Router([
            {path: 'home', handler: import('./handlers/home').then(h => h.HomeHandler)},
            {path: 'contact', handler: import('./handlers/contact').then(h => h.ContactHandler)}
        ]);
        this.setTheme(this.theme || '');
    }

    get router(){
        return this.router_;
    }

    get theme(){
        return localStorage.getItem('theme');
    }

    setTheme(theme: string){
        document.documentElement.className=theme;
        localStorage.setItem('theme', theme);
    }
}


export const app = new App();
