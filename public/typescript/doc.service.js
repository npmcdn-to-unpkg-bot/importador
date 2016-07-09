System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', './ex-request.options', 'angular2/platform/browser'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, ex_request_options_1, browser_1;
    var DocService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ex_request_options_1_1) {
                ex_request_options_1 = ex_request_options_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            }],
        execute: function() {
            DocService = (function () {
                function DocService(http, _domAdapter) {
                    this.http = http;
                    this._domAdapter = _domAdapter;
                    this._docUrl = 'doc/';
                }
                DocService.prototype.getDoc = function (user_namespace, doc_namespace) {
                    return this.http.get(this._docUrl + user_namespace + '/' + doc_namespace).map(function (res) { return JSON.parse(res.json().data); });
                };
                DocService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                DocService.prototype.postDoc = function (doc) {
                    var options = new ex_request_options_1.ExRequestOptions();
                    options.appendHeaders('Content-Type', 'application/json');
                    doc._token = this._domAdapter.getAttribute(this._domAdapter.query('meta'), 'content');
                    options.appendHeaders('X-CSRF-TOKEN', doc._token);
                    return this.http.post('doc', JSON.stringify(doc), options).map(function (res) { return res.json().status; });
                };
                DocService.prototype.putDoc = function (doc) {
                    var options = new ex_request_options_1.ExRequestOptions();
                    options.appendHeaders('Content-Type', 'application/json');
                    doc._token = this._domAdapter.getAttribute(this._domAdapter.query('meta'), 'content');
                    options.appendHeaders('X-CSRF-TOKEN', doc._token);
                    var tempDoc = { "id": doc.id,
                        "name": doc.name,
                        "title": doc.title,
                        "doc_namespace": doc.doc_namespace,
                        "doc": JSON.stringify(doc.doc),
                        "_token": doc._token
                    };
                    return this.http.put(this._docUrl + tempDoc.id, JSON.stringify(tempDoc), options).map(function (res) { return res.json().status; });
                };
                DocService.prototype.deleteDoc = function () {
                };
                DocService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, browser_1.BrowserDomAdapter])
                ], DocService);
                return DocService;
            }());
            exports_1("DocService", DocService);
        }
    }
});
