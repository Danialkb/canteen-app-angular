import {ApplicationConfig} from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {httpInterceptorProviders} from "./http-interceptors/config";
import {importProvidersFrom} from "@angular/core";


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule),
        httpInterceptorProviders,
        provideHttpClient(),
    ]
};
