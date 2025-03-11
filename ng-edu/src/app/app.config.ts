// app.config.ts

import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {routes} from "./app.routes";
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    // Provide the router with your app routes
    provideRouter(routes),

    // Provide the HTTP client for making HTTP requests
    provideHttpClient(),

    importProvidersFrom(MatSnackBarModule),

    // Add other global providers here
  ],
};
