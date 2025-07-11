import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { UserDTO } from '../../../interfaces/user';
import { Index } from '../../services';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { Sidebar } from "../sidebar/sidebar";
import { PageHeader, pageHeaderProps } from "../page-header/page-header";
import { Card, cardProps } from "../card/card";

@Component({
  selector: 'app-home',
  imports: [Navbar, Sidebar, PageHeader, Card],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  ngOnInit(): void {
    this.loadIndex()
  }

  protected user: UserDTO | undefined;
  private indexService = inject(Index)
  private authService = inject(AuthService)
  protected sidebar = false
  protected pagesHeaderProps: pageHeaderProps = {
    title: 'Página Inicial',
    page: [{
      nome: 'home',
      icon: 'bx bxs-home',
      link: '/'
    }]
  }
  protected cardProps: cardProps[] = [
    {
      titulo: 'Atendimento',
      desc: 'Gerencie atendimento, cadastre e edite paciente.',
      icone: 'bx bxs-user-account',
      link: '/atendimento'
    },
        {
      titulo: 'Agendamento',
      desc: 'Gerencie agendamento, cadastre e .',
      icone: 'bx bxs-calendar',
      link: '/agendamento'
    }
  ]
  

  logout(p: boolean){
    if (p){
      console.log(p)
      this.authService.logout()
    }
  }

  loadIndex(){
      this.indexService.getIndex().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error("Erro ao carregar dados da API: ", err)
        
      }
    })
  }

  toggleSidebar(){
    
    this.sidebar = !this.sidebar;
  }

}
