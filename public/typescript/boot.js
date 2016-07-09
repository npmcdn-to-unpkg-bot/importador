System.register(['angular2/platform/browser', 'angular2/http', './ex-request.options', './app.component', './cvs.service', 'angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, ex_request_options_1, app_component_1, cvs_service_1, core_1, browser_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
                browser_2 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ex_request_options_1_1) {
                ex_request_options_1 = ex_request_options_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (cvs_service_1_1) {
                cvs_service_1 = cvs_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [browser_2.BrowserDomAdapter, http_1.HTTP_PROVIDERS, cvs_service_1.CvsService, core_1.provide(http_1.RequestOptions, { useClass: ex_request_options_1.ExRequestOptions })]);
        }
    }
});
