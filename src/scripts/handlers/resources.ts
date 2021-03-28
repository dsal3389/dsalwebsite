import { fetchJSON } from "../http";
import { Handler, HandlerInitComponent } from "./handler";


@Handler({
    targetHTML: 'main',
    templateURL: 'resources.html'
})
export class ResourcesHandler implements HandlerInitComponent{
    
    onReady(){
        fetchJSON('resources.json').then(data => {
            console.log(data)
        });
    }
}