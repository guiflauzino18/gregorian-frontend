import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { UserDTO } from '../interfaces/user';
import { Index } from './services';
import { AuthService } from './services/auth-service';
import { Sidebar } from "./components/sidebar/sidebar";
import { showConfirm } from '../utils/popup';
import { cardProps } from './components/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{

  private authService = inject(AuthService);
  protected title = 'gregorian-frontend';
  protected sidebar = false;
  protected isLogged = this.authService.isLogged();

  user: UserDTO = {
    id: 0,
    nome: 'teste',
    sobrenome: 'teste',
    nascimento: 'teste',
    telefone: 'teste',
    email: 'teste',
    endereco: 'teste',
    login: 'teste',
    role: 'teste',
    status: 'ATIVO',
    alteraNextLogon: false,
    dataRegistro: 'teste',
    empresaNome: 'teste'
  }

  logout(){
    showConfirm({
      title: 'Sair?',
      callback: this.authService.logout
    })
  }

  toggleSidebar(){
    this.sidebar = !this.sidebar;
  }


}
