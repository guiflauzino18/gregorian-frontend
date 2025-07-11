import { Routes } from '@angular/router';
import { App } from './app';
import { authGuardGuard } from './guard/auth.guard-guard';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path: '', component: App, canActivate: [authGuardGuard]},
    {path: 'login', component: Login}
];
