import { appConfig } from "./app.conf";


function fetch_<T>(path: string, type: 'text' | 'json'): Promise<T>{
    const request = new XMLHttpRequest();
    request.responseType = type;
    request.open('GET', path);
    request.send();

    return new Promise((resolve, reject) => {
        request.onreadystatechange = () => {
            if(request.readyState === XMLHttpRequest.DONE)
                resolve(request.response);
        }
    });
}


export function fetchHTML<T>(path: string){
    return fetch_<T>(
        appConfig.production ? 
            `${appConfig.productionDomain}/${appConfig.productionFolder}/${path}` : path,
        'text'
    );
}

export function fetchJSON<T>(path: string){
    return fetch_<T>(
        `${appConfig.productionDomain}/${appConfig.productionContent}/${path}`,
        'json'
    )
}
