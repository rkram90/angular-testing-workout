import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { todosFeatureKey, todosReducer } from './todos/store/reducer';
import { TodosEffects } from './todos/store/effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideStore(),
    provideState(todosFeatureKey, todosReducer),
    provideEffects(TodosEffects),
  ],
};
