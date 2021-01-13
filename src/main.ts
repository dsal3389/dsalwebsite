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


const appRouter = new Router([
    {path: 'home', handler: import('./scripts/handlers/home').then(h => h.HomeHandler)},
    {path: 'about', handler: import('./scripts/handlers/about').then(h => h.AboutPageHandler)},
]);
