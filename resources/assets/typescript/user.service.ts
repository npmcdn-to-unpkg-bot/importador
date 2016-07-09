import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
@Injectable()
export class UserService
{
    constructor (private http: Http)
    {
    }

    private _userUrl = 'user/';  // URL to web api
    userDocs;
    userProfile;

    getUserDocs()
    {
        /*if(typeof docUrl!=='string')
            return Promise.resolve(null);*/
        return this.http.get(this._userUrl+'docs').map((res:Response) => JSON.parse(res.json().data));
    }

    getUserProfile()
    {
        /*if(typeof docUrl!=='string')
            return Promise.resolve(null);*/
        return this.http.get(this._userUrl+'profile').map((res:Response) => JSON.parse(res.json().data));
    }

    private handleError (error: Response)
    {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    postUser()
    {
        return this.http.get(this._userUrl).map((res:Response) => JSON.parse(res.json().data));
    }

    putUser()
    {

    }

    deleteUser()
    {

    }

}