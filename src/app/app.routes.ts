import { Routes } from '@angular/router';
import { StartComponent } from './views/start.component';
import { NewComponent } from './views/new.component';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'new', component: NewComponent },
];
