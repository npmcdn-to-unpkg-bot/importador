System.register(['angular2/core', 'angular2/common', './make-simple-cat.component', './cvs.service', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, make_simple_cat_component_1, cvs_service_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (make_simple_cat_component_1_1) {
                make_simple_cat_component_1 = make_simple_cat_component_1_1;
            },
            function (cvs_service_1_1) {
                cvs_service_1 = cvs_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_cvsService, _router) {
                    this._cvsService = _cvsService;
                    this._router = _router;
                    this.tableMigrationType = [{ "value": "1", "label": "simple" },
                        { "value": "2", "label": "multiple" },
                    ];
                    this.listOfCvsColumns = [];
                    this.currentSelectedMigrationType = this.tableMigrationType[0]["value"];
                    this.listOfSelectedCvsColumns = [];
                    this.showCvsTable = 0;
                    this.simpleTableRows = [];
                    this.simpleTableCols = [];
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.cvsData = cvsJsonData;
                    this.loadCvsCols();
                };
                AppComponent.prototype.getCvsData = function () {
                    var _this = this;
                    this._cvsService.getCvsData().subscribe(function (data) {
                        _this.cvsData = data;
                        console.log(data);
                    }, function (err) {
                        _this.errorMessage = true;
                        console.log('err');
                    });
                };
                AppComponent.prototype.loadCvsCols = function () {
                    var _this = this;
                    this.cvsData[0].forEach(function (value, index) {
                        _this.listOfCvsColumns.push({ "value": value, "position": index });
                    });
                };
                AppComponent.prototype.selectTableMigrationType = function (newSelection) {
                    this.currentSelectedMigrationType = newSelection;
                };
                AppComponent.prototype.selectCvsCol = function (newSelection) {
                    this.currentSelectedCvsColumn = newSelection;
                    this.loadSelectedCol(this.currentSelectedCvsColumn);
                };
                AppComponent.prototype.addExtraField = function (extraField) {
                    this.simpleTableCols.push({ "cvsCol": null, "position": this.simpleTableCols.length, "dbCol": extraField, "typeCol": "extra", "defaultValue": null });
                };
                AppComponent.prototype.resetCols = function () {
                    this.loadSelectedCol(this.currentSelectedCvsColumn);
                };
                AppComponent.prototype.resetRows = function () {
                    this.simpleTableRows = [];
                };
                AppComponent.prototype.resetCol = function (colPosition) {
                    this.simpleTableCols.splice(colPosition, 1);
                };
                AppComponent.prototype.loadSelectedCol = function (newSelection) {
                    if (this.currentSelectedMigrationType == 1) {
                        this.simpleTableCols = [];
                        this.simpleTableCols.push({ "cvsCol": this.cvsData[0][newSelection], "position": newSelection, "dbCol": null, "typeCol": "cvs", "defaultValue": null, "principal": true });
                    }
                };
                AppComponent.prototype.getUniqueCol = function () {
                    var uniqueCols = {};
                    this.simpleTableCols.forEach(function (valueSimpleTableCol, indexSimpleTableCol) {
                        if (valueSimpleTableCol['principal'])
                            uniqueCols = valueSimpleTableCol;
                    });
                    return uniqueCols;
                };
                AppComponent.prototype.getUniqueRows = function (principalTableCol) {
                    var uniqueCols = [];
                    var uniqueRowsPositions = [];
                    this.cvsData.forEach(function (valueCvsData, indexCvsData) {
                        if (indexCvsData > 0 &&
                            valueCvsData[principalTableCol] !== null &&
                            valueCvsData[principalTableCol].trim() !== '' &&
                            uniqueCols.indexOf(valueCvsData[principalTableCol].trim()) == -1) {
                            uniqueCols.push(valueCvsData[principalTableCol].trim());
                            uniqueRowsPositions.push(indexCvsData);
                        }
                    });
                    return uniqueRowsPositions;
                };
                AppComponent.prototype.makeRows = function () {
                    var _this = this;
                    this.simpleTableRows = [];
                    var principalTableCol = this.getUniqueCol();
                    var uniqueRowsPositions = [];
                    uniqueRowsPositions = this.getUniqueRows(principalTableCol['position']);
                    uniqueRowsPositions.forEach(function (uniqueColPosition) {
                        if (_this.simpleTableCols.length > 0) {
                            _this.simpleTableRows.push([]);
                            _this.simpleTableCols.forEach(function (valueSimpleTableCol, indexSimpleTableCol) {
                                if (valueSimpleTableCol['typeCol'] === 'cvs') {
                                    _this.simpleTableRows[_this.simpleTableRows.length - 1].push({ "value": _this.cvsData[uniqueColPosition][valueSimpleTableCol['position']], "dbCol": valueSimpleTableCol['dbCol'], "typeCol": "cvs" });
                                }
                                else {
                                    _this.simpleTableRows[_this.simpleTableRows.length - 1].push({ "value": valueSimpleTableCol['defaultValue'], "dbCol": valueSimpleTableCol['dbCol'], "typeCol": "extra" });
                                }
                            });
                        }
                    });
                };
                AppComponent.prototype.makeSimpleQuery = function () {
                    var _this = this;
                    this.simpleQuery = ' INSERT INTO ' + this.tableName + ' \n( ';
                    this.simpleTableCols.forEach(function (value, index) {
                        if (index > 0)
                            _this.simpleQuery = _this.simpleQuery + ', \n';
                        _this.simpleQuery = _this.simpleQuery + value['dbCol'];
                    });
                    this.simpleQuery = this.simpleQuery + ' ) \nVALUES  \n ';
                    this.simpleTableRows.forEach(function (value, index) {
                        if (index > 0)
                            _this.simpleQuery = _this.simpleQuery + ', \n';
                        _this.simpleQuery = _this.simpleQuery + ' ( ';
                        value.forEach(function (value2, index2) {
                            if (index2 > 0)
                                _this.simpleQuery = _this.simpleQuery + ' , ';
                            _this.simpleQuery = _this.simpleQuery + ' "' + value2['value'] + '" ';
                        });
                        _this.simpleQuery = _this.simpleQuery + ' ) ';
                    });
                    this.simpleQuery = this.simpleQuery + ';';
                };
                AppComponent.prototype.resetSimpleQuery = function () {
                    this.simpleQuery = '';
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'templates/app-component.html',
                        directives: [
                            make_simple_cat_component_1.MakeSimpleCatComponent,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            common_1.NgClass,
                            router_1.ROUTER_PROVIDERS
                        ]
                    }), 
                    __metadata('design:paramtypes', [cvs_service_1.CvsService, router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
