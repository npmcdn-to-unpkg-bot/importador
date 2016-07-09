import {Component,EventEmitter, OnInit,OnChanges,SimpleChange }     from 'angular2/core';
import {NgClass}                                                    from 'angular2/common';
import { Router,RouteParams}                                        from 'angular2/router';
@Component({
    selector: 'make-simple-cat',
    templateUrl: 'templates/make-simple-cat.html',
    inputs: [   'rowPosition',
                'colPosition',
                'currentCell',
                'cvsJsonData'
            ],
    outputs: ['newCat'],
    directives:[
                    MakeSimpleCatComponent
                ],
    providers:  [
                    NgClass
                ]
})


export class MakeSimpleCatComponent implements OnInit
{
    public  newCat = new EventEmitter();
    public  rowPosition;
    public  colPosition;
    public  currentCell;
    public  cvsJsonData;
    constructor(/*protected _langService: LangService,
                protected _docService: DocService,
                protected _userService: UserService,
                protected _router: Router,
                protected _routeParams: RouteParams*/)
    {
        /*super(  _langService,
                _docService,
                _userService,
                _router,
                _routeParams);
        this.hasPermision=false;
        this.editionActive=false;
        this.openAll=false;
        this.collapseAll=true;*/
    }

    ngOnInit()
    {

    }
}
