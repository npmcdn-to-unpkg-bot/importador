System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResumeCore;
    return {
        setters:[],
        execute: function() {
            ResumeCore = (function () {
                function ResumeCore(_langService, _resumeService, _router, _routeParams) {
                    this._langService = _langService;
                    this._resumeService = _resumeService;
                    this._router = _router;
                    this._routeParams = _routeParams;
                    this.hasPermision = true;
                    this.editionActive = false;
                    this.openAll = true;
                    this.collapseAll = false;
                }
                ResumeCore.prototype.loadJson = function () {
                    this.resume = {};
                    this.resume = JSON.parse(this.jsonEditor);
                };
                ResumeCore.prototype.getResume = function (urlName) {
                    var _this = this;
                    if (!urlName)
                        return false;
                    this._resumeService.getResume(urlName).subscribe(function (data) {
                        _this.resume = data;
                    }, function (err) {
                        _this.errorMessage = true;
                        _this._router.navigate(['ResumeHome']);
                    });
                };
                ResumeCore.prototype.setOpenAll = function () {
                    this.openAll = true;
                    this.collapseAll = false;
                };
                ResumeCore.prototype.setCollapseAll = function () {
                    this.openAll = false;
                    this.collapseAll = true;
                };
                ResumeCore.prototype.gotoAction = function (action, param) {
                    var link = [action, { name: param }];
                    this.currentAction = action;
                    this._router.navigate(link);
                };
                return ResumeCore;
            }());
            exports_1("ResumeCore", ResumeCore);
        }
    }
});
