import { Routes } from '@angular/router';
import { App } from './app';
import { authGuardGuard } from './guard/auth.guard-guard';
import { Login } from './components/login/login';
import { Home } from './components/home/home';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: '', component: Home, canActivate: [authGuardGuard]},
];
