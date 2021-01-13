import './styles/main.scss';
import { Router } from './scripts/router';


const appRouter = new Router([
    {path: 'home', handler: import('./scripts/handlers/home').then(h => h.HomeHandler)},
    {path: 'about', handler: import('./scripts/handlers/about').then(h => h.AboutPageHandler)},
]);
