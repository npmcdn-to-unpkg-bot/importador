System.register(['angular2/core', 'angular2/common', './add-element.component', './lang.service'], function(exports_1, context_1) {
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
    var core_1, common_1, add_element_component_1, lang_service_1;
    var ResumeSectionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (add_element_component_1_1) {
                add_element_component_1 = add_element_component_1_1;
            },
            function (lang_service_1_1) {
                lang_service_1 = lang_service_1_1;
            }],
        execute: function() {
            ResumeSectionComponent = (function () {
                function ResumeSectionComponent(_langService) {
                    this._langService = _langService;
                    this.childover = new core_1.EventEmitter();
                    this.childleave = new core_1.EventEmitter();
                    this.overThisElement = false;
                    this.hiddens = [];
                    this.editionOnElement = {};
                }
                ResumeSectionComponent.prototype.ngOnInit = function () {
                    this.dataType = this.getCase(this.section);
                    this.setDataType();
                };
                ResumeSectionComponent.prototype.ngOnChanges = function (changes) {
                    if (typeof this.collapseAll !== 'undefined' && typeof changes['collapseAll'] !== 'undefined') {
                        if (changes['collapseAll'].currentValue !== changes['collapseAll'].previousValue) {
                            if (changes['collapseAll'].currentValue) {
                                this.hiddenAll();
                            }
                        }
                    }
                    if (typeof this.openAll !== 'undefined' && typeof changes['collapseAll'] !== 'undefined') {
                        if (changes['openAll'].currentValue !== changes['openAll'].previousValue) {
                            if (changes['openAll'].currentValue) {
                                this.showAll();
                            }
                        }
                    }
                };
                ResumeSectionComponent.prototype.doubleLevelArray = function (level) {
                    var _this = this;
                    var hasDoubleArray = false;
                    if (this.isArray(level)) {
                        level.forEach(function (subLevel) {
                            if (_this.isArray(subLevel)) {
                                hasDoubleArray = true;
                                return true;
                            }
                        });
                    }
                    return hasDoubleArray;
                };
                ResumeSectionComponent.prototype.isObject = function (level) {
                    if (typeof level === 'object')
                        return true;
                    return false;
                };
                ResumeSectionComponent.prototype.isArray = function (level) {
                    return Object.prototype.toString.call(level) === '[object Array]';
                };
                ResumeSectionComponent.prototype.panelToggle = function (position) {
                    if (typeof this.hiddens[position] === 'undefined')
                        this.hiddens[position] = true;
                    else
                        this.hiddens[position] = !this.hiddens[position];
                };
                ResumeSectionComponent.prototype.hiddenPosition = function (position) {
                    if (typeof this.hiddens[position] === 'undefined')
                        return false;
                    return this.hiddens[position];
                };
                ResumeSectionComponent.prototype.hiddenAll = function () {
                    var count = 0;
                    if (this.dataType === "array") {
                        while (count < this.section.length) {
                            this.hiddens[count++] = true;
                        }
                    }
                    if (this.dataType === "property-value") {
                        while (count < this.keys.length) {
                            this.hiddens[count++] = true;
                        }
                    }
                };
                ResumeSectionComponent.prototype.showAll = function () {
                    var count = 0;
                    if (this.dataType === "array") {
                        while (count < this.section.length) {
                            this.hiddens[count++] = false;
                        }
                    }
                    if (this.dataType === "property-value") {
                        while (count < this.keys.length) {
                            this.hiddens[count++] = false;
                        }
                    }
                };
                ResumeSectionComponent.prototype.overThis = function (emitter) {
                    this.overThisElement = emitter;
                    this.childover.next(this.section);
                };
                ResumeSectionComponent.prototype.leaveThis = function (emitter) {
                    this.overThisElement = null;
                    this.childleave.next(this.section);
                };
                ResumeSectionComponent.prototype.notifyOverToParent = function (parent) {
                    this.childElementOver = parent;
                    this.childover.next(this.section);
                };
                ResumeSectionComponent.prototype.notifyLeaveToParent = function (parent) {
                    this.childElementOver = null;
                    this.childleave.next(this.section);
                };
                ResumeSectionComponent.prototype.overArrayChild = function (level) {
                    var _this = this;
                    if (level === this.childElementOver)
                        return true;
                    var arrayChild = false;
                    level.forEach(function (subLevel) {
                        if (subLevel === _this.childElementOver) {
                            arrayChild = true;
                        }
                    });
                    return arrayChild;
                };
                ResumeSectionComponent.prototype.getCase = function (item) {
                    if (!this.isObject(item))
                        return "primitive";
                    if (this.isArray(item))
                        return "array";
                    return "property-value";
                };
                ResumeSectionComponent.prototype.add = function (jsonInsert) {
                    if (this.dataType === 'array')
                        this.section.splice(jsonInsert.position, 0, jsonInsert.jsonValue);
                    if (this.dataType === 'property-value') {
                        this.propertyInsert(jsonInsert);
                        this.section[jsonInsert['newProperty']] = jsonInsert['newValue'];
                    }
                    this.setDataType();
                };
                ResumeSectionComponent.prototype.setEditionOnElement = function (position) {
                    if (typeof this.editionOnElement[position] === 'undefined')
                        this.editionOnElement[position] = true;
                    else
                        this.editionOnElement[position] = !this.editionOnElement[position];
                };
                ResumeSectionComponent.prototype.getEditionOnElement = function (position) {
                    if (typeof this.editionOnElement[position] === 'undefined')
                        return false;
                    return this.editionOnElement[position];
                };
                ResumeSectionComponent.prototype.setDataType = function () {
                    if (this.dataType === 'property-value')
                        this.keys = Object.keys(this.section);
                };
                ResumeSectionComponent.prototype.getItemKeys = function (item) {
                    if (this.getCase(item) === 'property-value')
                        return Object.keys(item);
                    return null;
                };
                ResumeSectionComponent.prototype.propertyInsert = function (jsonInsert) {
                    var count = 0;
                    var newSection = {};
                    console.log(jsonInsert.position);
                    while (count < jsonInsert.position) {
                        newSection[this.keys[count]] = this.section[this.keys[count]];
                        count++;
                    }
                    newSection[jsonInsert.newProperty] = jsonInsert.newValue;
                    console.log(this.keys.length);
                    while (count < this.keys.length) {
                        newSection[this.keys[count]] = this.section[this.keys[count]];
                        count++;
                    }
                    this.section = newSection;
                };
                ResumeSectionComponent = __decorate([
                    core_1.Component({
                        selector: 'resume-section',
                        templateUrl: 'templates/resume-section.html',
                        inputs: ['section',
                            'sectionTitle',
                            'sectionParent',
                            'editionActive',
                            'depth',
                            'collapseAll',
                            'openAll'
                        ],
                        outputs: ['childover', 'childleave'],
                        styles: ["\n                .section-title\n                {\n                  font-weight:bold;\n                }\n                .with-child-over\n                {\n                    /*text-decoration:underline;*/\n                    color:#204D74;\n                }\n                .clickeable\n                {\n                    cursor:pointer;\n                }\n                .border-left\n                {\n                    border-left:2px solid #FFFFFF;\n                }\n                .border-left:hover\n                {\n                    border-left:2px solid #204D74;\n                }\n\n                "
                        ],
                        directives: [ResumeSectionComponent, common_1.NgClass, add_element_component_1.AddElementComponent],
                    }), 
                    __metadata('design:paramtypes', [lang_service_1.LangService])
                ], ResumeSectionComponent);
                return ResumeSectionComponent;
            }());
            exports_1("ResumeSectionComponent", ResumeSectionComponent);
        }
    }
});
