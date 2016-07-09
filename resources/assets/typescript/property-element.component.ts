import {Component,EventEmitter,OnInit}  from 'angular2/core';
import {NgClass}                        from 'angular2/common';
import {LangService}                    from './lang.service';

@Component({
    selector: 'property-element',
    templateUrl: 'templates/property-element.html',
    inputs: ['section','sectionTitle','sectionParent'],
    outputs:['sendData'],
    directives:[
                    NgClass,
                    PropertyElementComponent
                ],
})
export class PropertyElementComponent implements OnInit
{
    public pushdata = new EventEmitter();
    public validated = new EventEmitter();
    propertyElementValue;

    public sendData = new EventEmitter();
    jsonValue;

    constructor(private _langService: LangService)
    {

    }

    setData()
    {
        if(
            this.jsonValue &&
            this.jsonValue!==''
        )
            this.sendData.next(this.jsonValue);
        else
            this.sendData.next(null);
    }

    ngOnInit()
    {
        this.jsonValue = {};
        this.setData();
    }
}