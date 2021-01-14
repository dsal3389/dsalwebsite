import { Handler, HandlerInitComponent } from './handler';
import { appConfig } from '../app.conf';


@Handler({
    targetHTML: 'main',
    templateURL: 'home.html',
})
export class HomeHandler implements HandlerInitComponent{

    onReady(){
        if(appConfig.production){
            const intro = document.getElementById("intro")!;
            const wranningMessage = document.createElement('div');

            wranningMessage.id= "warning-message";
            wranningMessage.innerHTML = `
                <h3 class="warn">[!WARNING!]</h3>
                <p>
                    this website is running on git pages, but to make the site URL more beautiful
                    its using <span class="accent">window.history.pushState()</span>, so if you refresh the page or copy the
                    current URL it will result in <span class="warn">404 ERROR</span>, to copy the correct current URL you
                    can press on the top right of the navbar.
                </p>
            `
            intro.appendChild(wranningMessage);
        }
    }
}
