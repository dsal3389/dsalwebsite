import { Handler, HandlerInitComponent } from './handler';
import { fetchJSON } from '../http';
import { appConfig } from '../app.conf';


interface Skill{
    name: string;
    image: string;
    description: string;
}

interface skillsResponse{
    skills: Skill[];
}


@Handler({
    targetHTML: 'main',
    templateURL: 'skills.html',
})
export class SkillsHandler implements HandlerInitComponent {

        onReady(){
            const skillsList = <HTMLDivElement>document.getElementById('skill-list')!;
            const skillDescription = <HTMLParagraphElement>document.getElementById('skill-description')!;

            fetchJSON<skillsResponse>('skills.json').then(data => {
                data['skills'].forEach(s => {
                    const skillContainer = <HTMLDivElement>document.createElement('div');
                    skillContainer.classList.add('skill');
                    skillContainer.innerHTML = `
                        <div class="terminal-window">
                            <div class="bar">
                                <small class="text">/skills/${s.name}</small>
                                <div class="space"></div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div class="terminal-content">
                                <img src="${appConfig.productionDomain}/${appConfig.productionContent}/${s.image}">
                            </div>
                        </div>
                    `;

                    skillContainer.addEventListener('click', () => {
                        skillDescription.innerText = `[${s.name}]: ${s.description}`;
                    });
                    skillsList.appendChild(skillContainer);
                });
            });
        }
}
