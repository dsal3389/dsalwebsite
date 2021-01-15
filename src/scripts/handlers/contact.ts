import { appConfig } from '../app.conf';
import { Handler, HandlerInitComponent } from './handler';


interface socialsResponse{
    "socials": Array<string[]>;
}

@Handler({
    targetHTML: 'main',
    templateURL: 'contact.html'
})
export class ContactHandler implements HandlerInitComponent{
    
    /**
     * fetching the data from the "backend" (git folder called content) and placing the
     * response in the HTML
     */
    onReady(){
        const socials = new XMLHttpRequest();
        socials.open('GET', `${appConfig.productionDomain}/${appConfig.productionContent}` + '/about/main.json');
        socials.responseType = 'json';
        socials.send();

        (() => {
            return new Promise<socialsResponse>((resolve, reject) => {
                socials.onreadystatechange = () => {
                    if(socials.readyState == XMLHttpRequest.DONE)
                        resolve(socials.response);
                }
            });
        })().then((res) => {
            const socialHTML = <HTMLUListElement>document.getElementById('social-list');
            let counter = 0;

            res['socials'].forEach(s => {
                const social = <HTMLLIElement>document.createElement('li');
                social.innerHTML = `
                    <p>[0x${counter.toString(16)}] <a href="${s[1]}" target="blank">${s[0]}</a></p>
                `;
                socialHTML.appendChild(social);
                counter++;
            });
        });
    }
}
