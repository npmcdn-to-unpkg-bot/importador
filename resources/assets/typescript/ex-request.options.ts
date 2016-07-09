import {Injectable, provide} from 'angular2/core';
import {BaseRequestOptions, RequestOptions} from 'angular2/http'

@Injectable()
export class ExRequestOptions extends BaseRequestOptions
{
    constructor()
    {
        super();
        //this.headers.append('X-CSRFToken', this.getCookie('csrftoken'));
    }

    getCookie(name)
    {
        let match= /XSRF-TOKEN=(.*?)($|;)/.exec(document.cookie);
        if(typeof match ==='undefined' || typeof match[1] ==='undefined' )
            return '';
        return match[1];
    }

    appendHeaders(headername: string, headervalue: string)
    {
        this.headers.append(headername, headervalue);
    }
}
/*
export var app = bootstrap(EnviromentComponent, [
  HTTP_PROVIDERS,
  provide(RequestOptions, {useClass: ExRequestOptions})
]);*/