import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from "./app/app.routes";
import { BaseUrlInterceptor } from "./app/core/interceptors/base-url.interceptor";
import {AuthInterceptor} from "./app/core/interceptors/auth.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([BaseUrlInterceptor, AuthInterceptor])),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
}).catch((err) => console.error(err));
