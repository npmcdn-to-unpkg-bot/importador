System.register(['angular2/core', 'angular2/common', './lang.service'], function(exports_1, context_1) {
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
    var core_1, common_1, lang_service_1;
    var PrimitiveElementComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (lang_service_1_1) {
                lang_service_1 = lang_service_1_1;
            }],
        execute: function() {
            PrimitiveElementComponent = (function () {
                function PrimitiveElementComponent(_langService) {
                    this._langService = _langService;
                    this.sendData = new core_1.EventEmitter();
                    this.emitSubmit = new core_1.EventEmitter();
                    this.wasReset = new core_1.EventEmitter();
                    this.initialMode;
                }
                PrimitiveElementComponent.prototype.ngOnInit = function () {
                    if (this.validModes === 'edition-view') {
                        if (typeof this.initialMode === 'string' &&
                            this.initialMode === 'view' ||
                            this.initialMode === 'edition') {
                            this.currentMode = this.initialMode;
                        }
                        else
                            this.currentMode = this.initialMode = 'view';
                        this.originalValue = this.jsonValue;
                    }
                    else if (this.validModes === 'view' || this.validModes === 'edition') {
                        this.currentMode = this.initialMode = this.validModes;
                    }
                    if (this.currentMode === 'view') {
                        if (!this.isEmptyValue())
                            this.emptyValue = false;
                        else
                            this.emptyValue = true;
                    }
                };
                PrimitiveElementComponent.prototype.setData = function () {
                    if (!this.isEmptyValue())
                        this.emptyValue = false;
                    else
                        this.emptyValue = true;
                    if (this.validModes === 'edition') {
                        if (!this.isEmptyValue()) {
                            this.sendData.next(this.jsonValue);
                        }
                        else {
                            this.sendData.next(null);
                        }
                    }
                };
                PrimitiveElementComponent.prototype.trySubmit = function () {
                    if (this.validModes === 'edition')
                        this.emitSubmit.next(true);
                    if (this.validModes === 'edition-view') {
                        if (this.switchable === true) {
                            if (this.currentMode === 'edition')
                                this.emitSubmit.next(this.jsonValue);
                            this.switchMode();
                        }
                    }
                };
                PrimitiveElementComponent.prototype.switchMode = function () {
                    if (this.validModes === 'edition-view') {
                        if (this.currentMode === 'edition')
                            this.currentMode = 'view';
                        else {
                            if (this.currentMode === 'view')
                                this.currentMode = 'edition';
                        }
                    }
                };
                PrimitiveElementComponent.prototype.isEmptyValue = function () {
                    if (this.jsonValue &&
                        this.jsonValue !== '' &&
                        this.jsonValue !== null &&
                        this.jsonValue.length > 0)
                        return false;
                    return true;
                };
                PrimitiveElementComponent = __decorate([
                    core_1.Component({
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
                        outputs: ['sendData', 'emitSubmit', 'wasReset'],
                        directives: [
                            common_1.NgClass,
                            PrimitiveElementComponent
                        ],
                    }), 
                    __metadata('design:paramtypes', [lang_service_1.LangService])
                ], PrimitiveElementComponent);
                return PrimitiveElementComponent;
            }());
            exports_1("PrimitiveElementComponent", PrimitiveElementComponent);
        }
    }
});
