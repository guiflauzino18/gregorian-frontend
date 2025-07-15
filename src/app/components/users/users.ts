import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { UsersServices } from '../../services/users';
import { UserDTO } from '../../../interfaces/user';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Pageable } from '../../../interfaces/pageable';

@Component({
  selector: 'app-users',
  imports: [MatPaginator, MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements AfterViewInit{

  private service = inject(UsersServices)
  protected pageable: Pageable<UserDTO> | undefined
  columns: string[] = ['id', 'nome', 'sobrenome', 'login', 'grupo'];
  dataSource: MatTableDataSource<UserDTO>;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  constructor(){
    this.getAllusers();
    this.dataSource = new MatTableDataSource(this.pageable?.content);
  }


  ngAfterViewInit(): void {
    this.paginator = new MatPaginator({

    })
  }


  getAllusers(){

    this.service.getAllUsers().subscribe({
      next: (res) => {
        this.pageable = res
        this.dataSource = new MatTableDataSource(this.pageable.content);
      },
      error: (err) => {
        console.error("Erro ao carregar dados da API: ", err)
        
      }
    });
  }


}
