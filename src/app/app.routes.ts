import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
];
