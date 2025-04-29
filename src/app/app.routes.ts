import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { View1Component } from './view-1/view-1.component';
import { View2Component } from './view-2/view-2.component';
import { View3Component } from './view-3/view-3.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view-1', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'view-1', component: View1Component, data: { text: 'View1' } },
  { path: 'view-2', component: View2Component, data: { text: 'View2' } },
  { path: 'view-3', component: View3Component, data: { text: 'View3' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
