import { Component,OnInit }             from 'angular2/core';
import { NgClass }                      from 'angular2/common';
import { MakeSimpleCatComponent }       from './make-simple-cat.component';
import { CvsService }                   from './cvs.service';
import { Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,RouteParams,RouteConfig} from 'angular2/router';

@Component({
    selector: 'my-app',
    templateUrl: 'templates/app-component.html',
    directives:[
                    MakeSimpleCatComponent,
                    ROUTER_DIRECTIVES
                ],
    providers:  [
                    NgClass,
                    ROUTER_PROVIDERS
                ]
})
export class AppComponent implements OnInit
{
    cvsData;
    errorMessage;
    tableMigrationType;
    listOfCvsColumns;
    currentSelectedMigrationType;
    currentSelectedCvsColumn;
    listOfSelectedCvsColumns;
    showCvsTable;
    simpleTableCols;
    simpleTableRows;
    tableName;
    simpleQuery;

    constructor(
                protected _cvsService: CvsService,
                private _router: Router)
    {
        this.tableMigrationType=[   {"value":"1","label":"simple"},
                                    {"value":"2","label":"multiple"},
                                ];
        this.listOfCvsColumns=[];
        this.currentSelectedMigrationType=this.tableMigrationType[0]["value"];
        this.listOfSelectedCvsColumns=[];
        this.showCvsTable=0;
        this.simpleTableRows=[];
        this.simpleTableCols=[];
    }

    ngOnInit()
    {
        this.cvsData=cvsJsonData;
        this.loadCvsCols();
    }

    getCvsData()
    {
        this._cvsService.getCvsData().subscribe(
            data =>
            {
                this.cvsData = data;
                console.log(data);
            },
            err =>
            {
                this.errorMessage = true;
                console.log('err');
            }
        );
    }

    loadCvsCols()
    {
        this.cvsData[0].forEach((value,index) =>
        {
           this.listOfCvsColumns.push({"value":value,"position":index});
        });
    }

    selectTableMigrationType(newSelection)
    {
        this.currentSelectedMigrationType=newSelection;
    }

    selectCvsCol(newSelection)
    {
        this.currentSelectedCvsColumn=newSelection;
        this.loadSelectedCol(this.currentSelectedCvsColumn);
    }

    addExtraField(extraField)
    {
        this.simpleTableCols.push({"cvsCol":null,"position":this.simpleTableCols.length,"dbCol":extraField,"typeCol":"extra","defaultValue":null});
    }

    resetCols()
    {
        this.loadSelectedCol(this.currentSelectedCvsColumn);
    }

    resetRows()
    {
        this.simpleTableRows=[];
    }

    resetCol(colPosition)
    {
        this.simpleTableCols.splice(colPosition,1);
    }

    loadSelectedCol(newSelection)
    {
        if(this.currentSelectedMigrationType==1)
        {
            this.simpleTableCols=[];
            this.simpleTableCols.push({"cvsCol":this.cvsData[0][newSelection],"position":newSelection,"dbCol":null,"typeCol":"cvs","defaultValue":null,"principal":true});
        }
    }

    getUniqueCol()
    {
        let uniqueCols={};
        this.simpleTableCols.forEach((valueSimpleTableCol,indexSimpleTableCol) =>
        {
            if(valueSimpleTableCol['principal'])
                uniqueCols = valueSimpleTableCol;
        });
        return uniqueCols;
    }

    getUniqueRows(principalTableCol)
    {
        let uniqueCols=[];
        let uniqueRowsPositions=[];
        this.cvsData.forEach((valueCvsData,indexCvsData) =>
        {
            if( indexCvsData>0  &&
                valueCvsData[principalTableCol]!== null &&
                valueCvsData[principalTableCol].trim()!=='' &&
                uniqueCols.indexOf(valueCvsData[principalTableCol].trim()) == -1)
            {
                uniqueCols.push(valueCvsData[principalTableCol].trim());
                uniqueRowsPositions.push(indexCvsData);
            }
        });
        return uniqueRowsPositions;
    }

    makeRows()
    {
        this.simpleTableRows=[];
        let principalTableCol=this.getUniqueCol();
        let uniqueRowsPositions=[];
        uniqueRowsPositions=this.getUniqueRows(principalTableCol['position']);
        uniqueRowsPositions.forEach((uniqueColPosition) =>
        {
            if(this.simpleTableCols.length>0)
            {
                this.simpleTableRows.push([]);
                this.simpleTableCols.forEach((valueSimpleTableCol,indexSimpleTableCol) =>
                {
                    if(valueSimpleTableCol['typeCol']==='cvs')
                    {
                        this.simpleTableRows[this.simpleTableRows.length-1].push({"value":this.cvsData[uniqueColPosition][valueSimpleTableCol['position']],"dbCol":valueSimpleTableCol['dbCol'],"typeCol":"cvs"});
                    }
                    else
                    {
                        this.simpleTableRows[this.simpleTableRows.length-1].push({"value":valueSimpleTableCol['defaultValue'],"dbCol":valueSimpleTableCol['dbCol'],"typeCol":"extra"});
                    }
                });
            }
        });
    }

    makeSimpleQuery()
    {
        this.simpleQuery=' INSERT INTO '+this.tableName+' \n( ';
        this.simpleTableCols.forEach((value,index) =>
        {
            if(index>0)
                this.simpleQuery = this.simpleQuery + ', \n';
            this.simpleQuery = this.simpleQuery + value['dbCol'];
        });
        this.simpleQuery= this.simpleQuery + ' ) \nVALUES  \n ';

        this.simpleTableRows.forEach((value,index) =>
        {
            if(index>0)
                this.simpleQuery= this.simpleQuery + ', \n';
            this.simpleQuery= this.simpleQuery + ' ( ';
            value.forEach((value2,index2) =>
            {
                if(index2>0)
                    this.simpleQuery= this.simpleQuery + ' , ';
                this.simpleQuery= this.simpleQuery + ' "'+value2['value']+'" ';
            });
            this.simpleQuery= this.simpleQuery + ' ) ';
        });
        this.simpleQuery= this.simpleQuery + ';';
    }

    resetSimpleQuery()
    {
        this.simpleQuery='';
    }

}