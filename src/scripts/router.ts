
/**
 * if there is no child there must be templateURL
 * and vice versa, there is no reason to check for validation, this is
 * not a framework, its me alone writing the code, so there is no need 4 extra code
 */
interface route_{
    path: string;
    handler?: Promise<any>;
    childs?: route_[];
}

export class Router{
    private routes_: route_[];
    
    constructor(routes: route_[]){
        this.routes_ = routes;
        this.route.handler?.then(h => h.build()); // load the current path, this will do for now

        window.history.pushState({}, "[dsal3389]", "/"); // make the url look better
        window.addEventListener('hashchange', () => this.handleRouteChange(), false);
    }

    /**
     * getting the current route, finding it based on the 
     * current path
     * 
     * if the route not found (404) its defaults to the first path
     * given in the constructor
     */
    get route(): route_{
        const hash = window.location.hash;
        const route = this.routes_.filter(r => new RegExp('#?' + r.path + '\/?').test(hash));

        if(!route.length){
            window.location.hash = this.routes_[0].path;
            return this.routes_[0];
        }
        return route[0];
    }

    getChildRoute(route: route_): route_{
        const childhash = window.location.hash.replace(
            new RegExp('#?' + route.path + '\/'), ''
        ); // remove the parent and the '#' '/'

        return route;
    }

    handleRouteChange(): void{
        let route = this.route;
        
        if(route.childs){
            route = this.getChildRoute(route);
        }

        route.handler!.then(h => {
            h.build();
        });
    }
}

