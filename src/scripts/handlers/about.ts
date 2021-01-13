import { Handler, HandlerInitComponent, HandlerKillComponent } from './handler';


@Handler({
    targetHTML: 'main',
    templateURL: 'about.html'
})
export class AboutPageHandler implements HandlerInitComponent, HandlerKillComponent{


    onReady() {
    }

    onKill() {

    }
}
