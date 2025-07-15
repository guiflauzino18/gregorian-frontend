import { Component } from '@angular/core';
import { PageHeader, pageHeaderProps } from "../page-header/page-header";
import { tabProps, Tabs } from "../../widget/tabs/tabs";
import { Table } from '../../widget/table/table';
import { Card } from '../card/card';
import { Users } from '../users/users';


@Component({
  selector: 'app-configuracao',
  imports: [PageHeader, Tabs],
  templateUrl: './configuracao.html',
  styleUrl: './configuracao.css'
})
export class Configuracao {

  protected pagesHeaderProps: pageHeaderProps = {
    title: 'Configuração',
    page: [
      {
      nome: 'home',
      icon: 'bx bxs-home',
      link: '/'
    },
    {
      nome: 'configuração',
      icon: 'bx bxs-cog',
      link: '/configuracao'
    }
  
  ]
  }


  userTabProps: tabProps[] = [
    {
      title: 'Usuários',
      icon: 'contacts_product',
      content: Users
    },
  ]

}