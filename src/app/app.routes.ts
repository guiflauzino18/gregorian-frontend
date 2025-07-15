import { Routes } from '@angular/router';
import { App } from './app';
import { authGuardGuard } from './guard/auth.guard-guard';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Configuracao } from './components/configuracao/configuracao';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: '', component: Home, canActivate: [authGuardGuard]},
    {path: 'configuracao', component: Configuracao, canActivate: [authGuardGuard]}
];
