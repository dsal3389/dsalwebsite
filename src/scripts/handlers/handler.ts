import { appConfig } from '../app.conf';


/**
 * called when html is loaded and ready to be used
 */
export interface HandlerInitComponent{
    onReady?: () => void;
}

/**
 * called before deleting the Handler, this made to clean
 * listeners
 */
export interface HandlerKillComponent{
    onKill?: () => void;
}

interface HandlerOptions{
    templateURL: string;
    targetHTML: string; // the ID of the tag, to where to set the content
}

/**
 * creates the handler by fetching the required HTML template
 * then replacing it into the DOM and when ready calling the onReady function
 * 
 * @param options 
 */
function createHandler(options: {
    targetHTML: string;
    template: string;
    target: any;
}){
    const htmlView = document.getElementById(options.targetHTML);

    if(!htmlView)
        throw Error(`couldnt find HTML element with the ID ${options.targetHTML}`);
    const component = new options.target();
    
    /**
     * fetching the remplate, placing the HTML into the DOM and
     * calling onReady when finished
     */
    (() => {
        const request = new XMLHttpRequest();
        request.open('GET', appConfig.production ? `${appConfig.productionDomain}/${appConfig.productionFolder}/${options.template}` : options.template);
        request.send();

        return new Promise((resolve, reject) => {
            request.onreadystatechange = () => {
                if(request.readyState == XMLHttpRequest.DONE)
                    resolve(request.responseText);
            };
        });
    })().then(html => {
        htmlView.innerHTML = (html as string);
        if(component.onReady instanceof Function)
            component.onReady();
    });
    return component;
}

/**
 * this decorator defines a Page Handler and allowing
 * for easy route, every page needs a ts file handler, this is 
 * like a angular Component
 * 
 * if you want to add listeners it can be added into the Handler constuctor
 * in case the listener listens on somting that requires the Template to be loaded
 * first implement HandlerInitComponent to the component
 */
export function Handler(options: HandlerOptions) {
    return <T extends { new (...args: any[]): {} }>(handler: T) => {
        return class HandlerCore extends handler{
            static current_ = null;

            static build = () => {
                const comp = createHandler({
                    targetHTML: options.targetHTML,
                    template: options.templateURL,
                    target: handler,
                });
                HandlerCore.current_ = comp;

                return comp;
            }

            static kill = () => {

            }
        }
    }
}
