import { Component,OnInit }             from 'angular2/core';
import { NgClass }                      from 'angular2/common';
import { Router,RouteParams}            from 'angular2/router';
import { LangService }                  from './lang.service';
import { JsandocCore }                  from './jsandoc-core';
import { DocService }                   from './doc.service';
import { UserService }                  from './user.service';
@Component({
    selector: 'user-profile',
    templateUrl: 'templates/user-profile.html',
    inputs: ['userProfile'],
    directives:[
                ],
    providers:  [
                    NgClass,
                    LangService
                ]
})


export class UserProfileComponent implements OnInit
{
    constructor(protected _langService: LangService,
                protected _docService: DocService,
                protected _userService: UserService,
                protected _router: Router,
                protected _routeParams: RouteParams)
    {
    }

    ngOnInit()
    {
    }
}
