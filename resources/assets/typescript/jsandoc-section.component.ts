import {Component,EventEmitter, OnInit,OnChanges,SimpleChange }     from 'angular2/core';
import {NgClass}                                                    from 'angular2/common';
import {AddElementComponent}                                        from './add-element.component';
import {PrimitiveElementComponent}                                  from './primitive-element.component';
import {LangService}                                                from './lang.service';

@Component({
    selector: 'jsandoc-section',
    templateUrl: 'templates/jsandoc-section.html',
    inputs: [   'section',
                'sectionTitle',
                'sectionParent',
                'editionActive',
                'depth',
                'collapseAll',
                'openAll',
                'defaultState',
                'parentDataType',
                'ownEditionActive'
            ],
    outputs: ['childover','childleave','sectionCreated','sectionUpdated'],
    directives:[JsandocSectionComponent,NgClass,AddElementComponent,PrimitiveElementComponent],
})
export class JsandocSectionComponent implements OnInit,OnChanges
{
    public childover = new EventEmitter();
    public childleave = new EventEmitter();
    public sectionCreated = new EventEmitter();
    public sectionUpdated = new EventEmitter();
    section;
    keys;
    dataType;
    parentDataType;
    depth;
    collapseAll:boolean;
    openAll:boolean;

    sectionTitle;
    sectionParent;
    editionActive;
    editionOnElement;
    childElementOver;
    overThisElement = false;
    hiddens = [];
    newElement;
    initReady:boolean;
    ownEditionActive:boolean;
    childrenEditionActive;

    constructor(private _langService: LangService)
    {
        this.editionOnElement={};
        this.ownEditionActive=false;
        this.childrenEditionActive= [];
        this.initReady=false;
    }

    ngOnInit()
    {
        this.makeInit();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange})
    {
        if(this.hasSection())
        {
            this.makeInit();
            if(typeof this.collapseAll !== 'undefined' && typeof changes['collapseAll'] !== 'undefined')
            {
                if(changes['collapseAll'].currentValue !== changes['collapseAll'].previousValue)
                {
                    if(changes['collapseAll'].currentValue===true)
                    {
                        this.hiddenAll();
                    }
                }
            }

            if(typeof this.openAll !== 'undefined' && typeof changes['collapseAll'] !== 'undefined')
            {
                if(changes['openAll'].currentValue !== changes['openAll'].previousValue)
                {
                    if(changes['openAll'].currentValue===true)
                    {
                        this.showAll();
                    }
                }
            }
        }
    }

    doubleLevelArray(level):boolean
    {
        var hasDoubleArray = false;
        if(this.isArray(level))
        {
            level.forEach((subLevel) =>
            {
                if(this.isArray(subLevel))
                {
                    hasDoubleArray = true;
                    return true;
                }
            });
        }
        return hasDoubleArray;
    }

    isObject(level):boolean
    {
        if(typeof level ==='object')
            return true;
        return false;
    }

    isArray(level):boolean
    {
        return Object.prototype.toString.call( level ) === '[object Array]';
    }

    panelToggle(position):void
    {
        if( typeof this.hiddens[position]==='undefined')
            this.hiddens[position] = true;
        else
            this.hiddens[position] = !this.hiddens[position];
    }

    hiddenPosition(position,forceValue)
    {
        if( typeof this.hiddens[position]==='undefined')
            return false;
        return this.hiddens[position];
    }

    hiddenAll()
    {
        var count = 0;
        if(this.dataType ==="array")
        {
            while(count<this.section.length)
            {
                this.hiddens[count++]=true;
            }
        }
        if(this.dataType ==="property-value")
        {
            while(count<this.keys.length)
            {
                this.hiddens[count++]=true;
            }
        }
    }

    showAll()
    {
        var count = 0;
        if(this.dataType ==="array")
        {
            while(count<this.section.length)
            {
                this.hiddens[count++]=false;
            }
        }
        if(this.dataType ==="property-value")
        {
            while(count<this.keys.length)
            {
                this.hiddens[count++]=false;
            }
        }
    }

    overThis(emitter)
    {
        this.overThisElement=emitter;
        this.childover.next(this.section);
    }

    leaveThis(emitter)
    {
        this.overThisElement=null;
        this.childleave.next(this.section);
    }

    notifyOverToParent(parent)
    {
        this.childElementOver = parent;
        this.childover.next(this.section);
    }

    notifyLeaveToParent(parent)
    {
        this.childElementOver = null;
        this.childleave.next(this.section);
    }

    overArrayChild(level)
    {
        if(level === this.childElementOver)
            return true;
        var arrayChild=false;
        level.forEach((subLevel) =>
        {
            if(subLevel===this.childElementOver)
            {
                arrayChild = true;
            }
        });
        return arrayChild;
    }

    getCase(item):string
    {
        if(typeof item ==='undefined' || item===null)
        {
            return 'empty';
        }

        if(!this.isObject(item))
        {
            return "primitive";
        }

        if(this.isArray(item))
        {
            return "array";
        }

        return "property-value";
    }

    add(jsonInsert)
    {
        this.initReady=false;
        if(this.hasSection())
        {
            if(this.dataType === 'array')
                this.section.splice(jsonInsert.position,0 ,jsonInsert.jsonValue );
            if(this.dataType === 'property-value')
                this.propertySplit(jsonInsert.position,0,jsonInsert.newProperty,jsonInsert.newValue);
        }
        else
        {
            this.section = jsonInsert.jsonValue;
            this.sectionCreated.next(this.section);
        }
        this.sectionUpdatedNotify();
    }

    switchOwnEditionActive():void
    {
        this.ownEditionActive=!this.ownEditionActive;
    }

    getOwnEditionActive():boolean
    {
        return this.ownEditionActive;
    }

    switchChildrenEditionActive(position):void
    {
        if( typeof this.childrenEditionActive[position]==='undefined')
            this.childrenEditionActive[position]=true;
        else
            this.childrenEditionActive[position]=!this.childrenEditionActive[position];

        if(this.childrenEditionActive[position]===true)
            this.hiddens[position]=false;
    }

    getChildrenEditionActive(position):boolean
    {
        if( typeof this.childrenEditionActive[position]==='undefined')
            return false;
        return this.childrenEditionActive[position];
    }

    setDataType()
    {
        if( this.hasSection() && this.dataType ==='property-value')
            this.keys = Object.keys(this.section);
    }

    getItemKeys(item)
    {
        if( this.getCase(item) ==='property-value')
            return Object.keys(item);
        return null;
    }

    propertySplit(start,deleteCount,newProperty,newValue)
    {
        var count = 0;
        var newSection={};
        while(count<start)
        {
            newSection[this.keys[count]] = this.section[this.keys[count]];
            count++;
        }

        if( typeof newProperty!== 'undefined' && newProperty!==null &&
            typeof newValue!== 'undefined' && newValue!==null
            )
            newSection[newProperty] = newValue;

        if(typeof newProperty!== 'number')
            count = count + deleteCount;

        while(count<this.keys.length)
        {
            newSection[this.keys[count]] = this.section[this.keys[count]];
            count++;
        }
        this.section = newSection;
    }

    hasSection():boolean
    {
        return typeof this.section === 'object' && this.section!==null;
    }

    makeInit():void
    {
        //console.log(this.initReady);
        if(this.initReady===false)
        {
            //console.log('this.initReady===false');
            this.dataType = this.getCase(this.section);
            this.setDataType();
            this.initReady=true;
            //console.log('section-defaultMode:'+this.defaultAddMode);
            //console.log('section-dataType:'+this.dataType);
        }
    }

    sectionUpdatedNotify()
    {
        this.initReady=false;
        this.makeInit();
        this.sectionUpdated.next(this.section);
    }

    isEmpty()
    {
        if(this.hasSection())
        {
            if(this.dataType==='array' && this.section.length===0)
                return true;
            if(this.dataType==='property-value' && this.keys.length===0)
                return true;
            return false;
        }
        return true;
    }

    removePosition(start)
    {
        if(confirm('Seguro que deseas eliminar?'))
        {
            if(this.dataType === 'array')
                this.section.splice(start,1);
            else
                this.propertySplit(start,1,null,null);

            this.initReady=false;
            this.makeInit();
            this.sectionUpdated.next(this.section);
        }
    }

    removeSection()
    {
        if(confirm('Seguro que deseas eliminar?'))
        {
            delete this.section;
            this.initReady=false;
            this.makeInit();
            this.sectionUpdated.next(this.section);
        }
    }

    isEmptyObject(item)
    {
        let currentCase = this.getCase(item);
        if(currentCase==="array")
        {
            return item.length===0;
        }
        if(currentCase==="property-value")
        {
            return Object.keys(item).length===0;
        }
        return true;
    }

    catchEdition(oldValue,newValue,type,positionOrKey)
    {
        if(typeof newValue ==='string' && newValue!== oldValue)
        {
            if(type==='property')
            {
                this.add({"newProperty":newValue,"newValue":this.section[oldValue],"position":positionOrKey});
                delete this.section[oldValue] ;

            }
            if(type==='value')
            {
                this.section[positionOrKey]=newValue;
            }

            this.sectionUpdatedNotify();
        }
    }
}