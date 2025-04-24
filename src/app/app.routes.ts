import { Routes } from '@angular/router';
import { StartComponent } from './views/start/start.component';
import { NewComponent } from './views/new/new.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'new', component: NewComponent },
];
