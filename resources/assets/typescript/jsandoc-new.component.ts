import { Component,OnInit }             from 'angular2/core';
import { NgClass }                      from 'angular2/common';
import { Router,RouteParams}            from 'angular2/router';
import { LangService }                  from './lang.service';
import { JsandocCore }                  from './jsandoc-core';
import { DocService }                   from './doc.service';
import { UserService }                  from './user.service';
import { JsandocSectionComponent }      from './jsandoc-section.component';
@Component({
    selector: 'jsandoc-new',
    templateUrl: 'templates/jsandoc-new.html',
    directives:[
                    JsandocSectionComponent
                ],
    providers:  [
                    NgClass,
                    LangService
                ]
})


export class JsandocNewComponent extends JsandocCore implements OnInit
{
    newDoc;
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
        this.newDoc={};
    }

    ngOnInit()
    {
        this.getUserProfile();
    }

    createDocument()
    {
        this.postJsandoc(this.newDoc);
    }

    postJsandoc(doc)
    {
        this._docService.postDoc(doc).subscribe(
        data =>
        {
            return this.gotoAction('JsandocHome',this.userProfile.user_namespace,'');
        },
        err =>
        {
            this.errorMessage = true;
            //this._router.navigate(['JsandocHome']);
        }
        );
    }
}
