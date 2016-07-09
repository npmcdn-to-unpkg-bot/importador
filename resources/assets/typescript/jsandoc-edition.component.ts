import { Component,OnInit }             from 'angular2/core';
import { NgClass }                      from 'angular2/common';
import { Router,RouteParams}            from 'angular2/router';
import { LangService }                  from './lang.service';
import { JsandocCore }                  from './jsandoc-core';
import { DocService }                   from './doc.service';
import { UserService }                  from './user.service';
import { JsandocSectionComponent }      from './jsandoc-section.component';
@Component({
    selector: 'jsandoc-edition',
    templateUrl: 'templates/jsandoc-edition.html',
    directives:[
                    JsandocSectionComponent
                ],
    providers:  [
                    NgClass,
                    LangService
                ]
})


export class JsandocEditionComponent extends JsandocCore implements OnInit
{
    needToSave:boolean;
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
        this.openAll=false;
        this.collapseAll=true;
    }

    ngOnInit()
    {
        this.getJsandoc(this._routeParams.get('user_namespace'),this._routeParams.get('doc_namespace'),
            {
                "afterSuccessAjax":data=>{
                    this.needToSave=false;
                }
            });
    }

    sectionWasCreated(section)
    {
        this.jsandoc.doc=section;
    }

    sectionWasUpdated(section)
    {
        this.needToSave=true;
        this.jsandoc.doc=section;
    }

    saveDoc()
    {
        this._docService.putDoc(this.jsandoc).subscribe(
        data =>
        {
            this.needToSave=false;
            alert('Saved');
            /*return this.gotoAction('JsandocHome',this.userProfile.user_namespace,'');*/
        },
        err =>
        {
            this.errorMessage = true;
            //this._router.navigate(['JsandocHome']);
        }
        );
    }
}
