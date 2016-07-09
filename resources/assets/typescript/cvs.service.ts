import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class CvsService
{
    constructor (private http: Http)
    {
    }

    private _cvsUrl = 'cvson';  // URL to web api
    cvsDocs;
    cvsProfile;

    getCvsData()
    {
        /*if(typeof docUrl!=='string')
            return Promise.resolve(null);*/
        return this.http.get(this._cvsUrl).map((res:Response) => JSON.parse(res.json().data));
    }

    getCvsProfile()
    {
        /*if(typeof docUrl!=='string')
            return Promise.resolve(null);*/
        return this.http.get(this._cvsUrl+'profile').map((res:Response) => JSON.parse(res.json().data));
    }

    private handleError (error: Response)
    {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    postCvs()
    {
        return this.http.get(this._cvsUrl).map((res:Response) => JSON.parse(res.json().data));
    }

    putCvs()
    {

    }

    deleteCvs()
    {

    }

}