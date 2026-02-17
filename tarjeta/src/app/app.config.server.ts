// Solo para desarrollo: Permitir certificados auto-firmados del backend
if (typeof process !== 'undefined') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
