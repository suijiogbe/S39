import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Summary } from './summary/summary';
import { Reports } from './reports/reports';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: 'summary',
    component: Summary,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: Reports,
    canActivate: [AuthGuard]
  }
];
