/*
* TODO 
* Classe responsável por autenticar usuários à API e gerenciar autenticações e tokens
*/


import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

//Dados enviados para autenticar
export type LoginRequest = {
  login: string,
  password: string
}

//Dados recebidos na autenticação
export type LoginResponse = {
  id: number,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.apiUrl

  constructor(private http: HttpClient, private router: Router){}

  login(credentials: LoginRequest){
    const url = `${this.API_URL}/login`
    return this.http.post<LoginResponse>(url, credentials)
    
  }

  setToken(token: string, id: number): void {
    document.cookie = `token=${token}; path=/; secure; samesite=strict`;
    document.cookie = `id=${id}; path=/; secure; samesite=strict`;
  }

  getToken(): string | null{
    const cookie = document.cookie.split('; ')
    const token = cookie.find(row => row.startsWith('token='));
    return token ? token.split('=')[1] : null;
  }

  logout(): void{
    document.cookie = 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
