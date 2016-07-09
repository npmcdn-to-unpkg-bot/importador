import { bootstrap }                        from 'angular2/platform/browser';
import { HTTP_PROVIDERS, RequestOptions }   from 'angular2/http';
import { ExRequestOptions }                 from './ex-request.options';
import { AppComponent }                     from './app.component'/*
import { DocService }                       from './doc.service';*/
import { CvsService }                       from './cvs.service';
import { provide }                          from 'angular2/core';
import { BrowserDomAdapter }                from 'angular2/platform/browser';
import 'rxjs/Rx';

/*bootstrap(AppComponent,[BrowserDomAdapter,HTTP_PROVIDERS,DocService,UserService,provide(RequestOptions, {useClass: ExRequestOptions})]);*/
bootstrap(AppComponent,[BrowserDomAdapter,HTTP_PROVIDERS,CvsService,provide(RequestOptions, {useClass: ExRequestOptions})]);
