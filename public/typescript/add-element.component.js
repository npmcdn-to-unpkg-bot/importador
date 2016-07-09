System.register(['angular2/core', 'angular2/common', './primitive-element.component', './array-element.component', './property-element.component', './lang.service'], function(exports_1, context_1) {
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
    var core_1, common_1, primitive_element_component_1, array_element_component_1, property_element_component_1, lang_service_1;
    var AddElementComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (primitive_element_component_1_1) {
                primitive_element_component_1 = primitive_element_component_1_1;
            },
            function (array_element_component_1_1) {
                array_element_component_1 = array_element_component_1_1;
            },
            function (property_element_component_1_1) {
                property_element_component_1 = property_element_component_1_1;
            },
            function (lang_service_1_1) {
                lang_service_1 = lang_service_1_1;
            }],
        execute: function() {
            AddElementComponent = (function () {
                function AddElementComponent(_langService) {
                    this._langService = _langService;
                    this.pushdata = new core_1.EventEmitter();
                }
                AddElementComponent.prototype.ngOnInit = function () {
                    this.initMode();
                };
                AddElementComponent.prototype.changeMode = function (mode) {
                    this.mode = mode;
                };
                AddElementComponent.prototype.add = function () {
                    if (!this.validePush())
                        return false;
                    switch (this.mode) {
                        case 'primitive':
                            this.pushdata.next({ "jsonValue": this.primitiveElementValue, "position": this.getPosition() });
                            break;
                        case 'array':
                            this.pushdata.next({ "jsonValue": this.arrayElementValue, "position": this.getPosition() });
                            break;
                        case 'property-value':
                            this.pushdata.next({ "jsonValue": this.propertyElementValue, "position": this.getPosition() });
                            break;
                        case 'primitive-primitive':
                            this.pushdata.next({ "newProperty": this.propertyPrimitiveElementValue, "newValue": this.propertyValuePrimitiveElementValue, "position": this.getPosition() });
                            break;
                        case 'primitive-array':
                            this.pushdata.next({ "newProperty": this.propertyPrimitiveElementValue, "newValue": this.propertyArrayPrimitiveElementValue, "position": this.getPosition() });
                            break;
                        case 'primitive-property':
                            this.pushdata.next({ "newProperty": this.propertyPrimitiveElementValue, "newValue": this.propertyPropertyElementValue, "position": this.getPosition() });
                            break;
                    }
                    this.mode = null;
                    this.initMode();
                };
                AddElementComponent.prototype.getModeAsInt = function () {
                    switch (this.mode) {
                        case 'primitive': return 1;
                        case 'array': return 2;
                        case 'property-value': return 3;
                        case 'primitive-primitive': return 4;
                        case 'primitive-array': return 5;
                        case 'primitive-property': return 6;
                    }
                    return 0;
                };
                AddElementComponent.prototype.setJsonLevel = function (jsonValue, level) {
                    this[level] = jsonValue;
                };
                AddElementComponent.prototype.validePush = function () {
                    if (this.mode === 'primitive' && this.primitiveElementValue)
                        return true;
                    if (this.mode === 'array' && this.arrayElementValue)
                        return true;
                    if (this.mode === 'property-value' && this.propertyElementValue)
                        return true;
                    if (this.mode === 'primitive-primitive' &&
                        this.propertyPrimitiveElementValue &&
                        this.propertyValuePrimitiveElementValue)
                        return true;
                    if (this.mode === 'primitive-array' &&
                        this.propertyPrimitiveElementValue &&
                        this.propertyArrayPrimitiveElementValue)
                        return true;
                    if (this.mode === 'primitive-property' &&
                        this.propertyPrimitiveElementValue &&
                        this.propertyPropertyElementValue)
                        return true;
                    return false;
                };
                AddElementComponent.prototype.getPosition = function () {
                    var selectedPosition;
                    if (this.dataType === 'array')
                        selectedPosition = this.section.length;
                    if (this.dataType === 'property-value')
                        selectedPosition = this.keys.length;
                    var orderPosition = 'after';
                    if (typeof this.selectedPosition !== 'undefined')
                        selectedPosition = this.selectedPosition;
                    if (typeof this.orderPosition !== 'undefined')
                        orderPosition = this.orderPosition;
                    if (orderPosition === 'after')
                        return selectedPosition;
                    if (orderPosition === 'before')
                        return selectedPosition - 1;
                    return 0;
                };
                AddElementComponent.prototype.initMode = function () {
                    this.mode = null;
                    if (this.dataType === 'array')
                        this.mode = 'primitive';
                    if (this.dataType === 'property-value')
                        this.mode = 'primitive-primitive';
                    this.typeSelector = 'primitive-primitive';
                    if (typeof this.mode === 'undefined' || this.mode === null)
                        this.mode = 'array';
                };
                AddElementComponent = __decorate([
                    core_1.Component({
                        selector: 'add-element',
                        templateUrl: 'templates/add-element.html',
                        inputs: ['section', 'dataType', 'keys'],
                        outputs: ['pushdata'],
                        styles: [".les-important{opacity: 0.6;}\n              .les-important:hover{opacity: 1;}\n             "
                        ],
                        directives: [common_1.NgClass,
                            AddElementComponent,
                            primitive_element_component_1.PrimitiveElementComponent,
                            array_element_component_1.ArrayElementComponent,
                            property_element_component_1.PropertyElementComponent
                        ],
                    }), 
                    __metadata('design:paramtypes', [lang_service_1.LangService])
                ], AddElementComponent);
                return AddElementComponent;
            }());
            exports_1("AddElementComponent", AddElementComponent);
        }
    }
});
