import {ApplicationConfig} from "@angular/platform-browser";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {httpInterceptorProviders} from "./http-interceptors/config";
import {importProvidersFrom, isDevMode} from "@angular/core";
import {ServiceWorkerModule} from "@angular/service-worker";


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })),
        httpInterceptorProviders,
        provideHttpClient(),
    ]
};
