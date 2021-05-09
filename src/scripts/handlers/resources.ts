import { fetchJSON } from "../http";
import { Handler, HandlerInitComponent } from "./handler";


@Handler({
    targetHTML: 'main',
    templateURL: 'resources.html'
})
export class ResourcesHandler implements HandlerInitComponent{
    
    onReady(){
        const resourceList = <HTMLDivElement>document.getElementById('resources-list');

        fetchJSON<any>('resources.json').then(data => {
            resourceList.innerHTML = '';
            resourceList.append(this.createList("/", data));
        });
    }

    createList(name:string, list:any){
        const div = <HTMLDivElement>document.createElement('div');
        const ul  = <HTMLUListElement> document.createElement('ul');
        div.innerHTML = `<p class="folder-name">${name}</p>`;
        div.appendChild(ul);

        for(let name in list){
            let element;
        
            if(list[name] instanceof Object){
                element = this.createList(name, list[name]);
                element.getElementsByTagName('p')[0].prepend(document.createElement('span').innerText="└ ─ ");
            } else {
                element =<HTMLLIElement>document.createElement('li');
                element.innerHTML = `<p><span>├── </span><a href="${list[name]}" target="blank">/${name}</a></p>`;
            }

            ul.appendChild(element);
        }
        return div;
    }
}