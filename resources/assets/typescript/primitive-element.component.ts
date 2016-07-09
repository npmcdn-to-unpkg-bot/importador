import {
            Component,
            EventEmitter,
            OnInit,
            OnChanges,
            SimpleChange
        }                       from 'angular2/core';
import {NgClass}                from 'angular2/common';
import {LangService}            from './lang.service';

@Component({
    selector: 'primitive-element',
    templateUrl: 'templates/primitive-element.html',
    inputs: [
                'primitiveElementPlaceHolder',
                'primitiveElementTitle',
                'jsonValue',
                'mode',
                'initialMode',
                'validModes',
                'switchable',
                'inputType',
                'reset'
            ],
    outputs:['sendData','emitSubmit','wasReset'],
    directives:[
                    NgClass,
                    PrimitiveElementComponent
                ],
})
export class PrimitiveElementComponent implements OnInit
{
    public sendData     = new EventEmitter();
    public emitSubmit   = new EventEmitter();
    public wasReset     = new EventEmitter();
    jsonValue;
    validModes;//the valid modes are, view, edition,edition-view
    initialMode;
    currentMode;
    originalValue;
    emptyValue;
    switchable;
    inputType;


    constructor(private _langService: LangService)
    {
        this.initialMode
    }

    ngOnInit()
    {
        if(this.validModes==='edition-view')
        {
            if( typeof this.initialMode ==='string' &&
                this.initialMode ==='view' ||
                this.initialMode ==='edition'
                )
            {
                this.currentMode=this.initialMode;
            }
            else
                this.currentMode=this.initialMode='view';
            this.originalValue=this.jsonValue;
        }
        else
            if(this.validModes==='view' || this.validModes==='edition')
            {
                this.currentMode=this.initialMode=this.validModes;
            }
        if(this.currentMode==='view')
        {
            if(!this.isEmptyValue())
                this.emptyValue=false;
            else
                this.emptyValue=true;
        }
    }


    setData()
    {
        if(!this.isEmptyValue())
                this.emptyValue=false;
            else
                this.emptyValue=true;

        if(this.validModes==='edition')
        {
            if(!this.isEmptyValue())
            {
                this.sendData.next(this.jsonValue);
            }
            else
            {
                this.sendData.next(null);
            }
        }
    }

    trySubmit()
    {
        if(this.validModes==='edition')
            this.emitSubmit.next(true);
        if(this.validModes==='edition-view')
        {
            if(this.switchable===true)
            {
                if(this.currentMode==='edition')
                    this.emitSubmit.next(this.jsonValue);
                this.switchMode();
            }
        }
    }

    switchMode()
    {
        if(this.validModes==='edition-view')
        {
            if(this.currentMode==='edition')
                this.currentMode='view';
            else
            {
                if(this.currentMode==='view')
                    this.currentMode='edition';
            }
        }
    }

    isEmptyValue()
    {
        if(
                this.jsonValue &&
                this.jsonValue!=='' &&
                this.jsonValue!==null &&
                this.jsonValue.length>0

            )
            return false;
        return true;
    }
}