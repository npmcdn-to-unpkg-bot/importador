import { Component,OnInit }             from 'angular2/core';
import { NgClass }                      from 'angular2/common';
import { Router,RouteParams}            from 'angular2/router';
import { LangService }                  from './lang.service';
import { JsandocCore }                  from './jsandoc-core';
import { DocService }                   from './doc.service';
import { UserService }                  from './user.service';
import { UserProfileComponent }         from './user-profile.component';
import { JsandocSectionComponent }      from './jsandoc-section.component';
@Component({
    selector: 'jsandoc-home',
    templateUrl: 'templates/jsandoc-home.html',
    directives:[
                    JsandocSectionComponent,
                    UserProfileComponent
                ],
    providers:  [
                    NgClass,
                    LangService
                ]
})


export class JsandocHomeComponent extends JsandocCore implements OnInit
{
    constructor(protected _langService: LangService,
                protected _docService: DocService,
                protected _userService: UserService,
                protected _router: Router,
                protected _routeParams: RouteParams)
    {
        super(  _langService,
                _docService,
                _userService,
                _router,
                _routeParams);
        this.hasPermision=true;
        this.editionActive=false;
        this.openAll=true;
        this.collapseAll=false;
    }

    ngOnInit()
    {
        this.getUserProfile();
        this.getUserDocs();
    }
}
