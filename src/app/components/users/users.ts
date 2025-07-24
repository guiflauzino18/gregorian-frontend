import { AfterViewInit, Component, inject, numberAttribute, OnInit, ViewChild } from '@angular/core';
import { UsersServices } from '../../services/users';
import { UserDTO } from '../../../interfaces/user';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Pageable } from '../../../interfaces/pageable';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreateNewUser } from './modal/create/create';

@Component({
  selector: 'app-users',
  imports: [MatPaginator, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements AfterViewInit{

  private service = inject(UsersServices)
  protected pageable: Pageable<UserDTO> | undefined;
  columns: string[] = ['id', 'nome', 'sobrenome', 'login', 'grupo', 'opcoes'];
  dataSource: MatTableDataSource<UserDTO> | undefined;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  readonly modalNewUser = inject(MatDialog);


  constructor(){
    
    this.getAllusers();
    
  }

  ngAfterViewInit(): void {
    //this.paginator.pageSize = this.dataSource.pa
    
  }

  getAllusers(event?: any){

    //Inicia loading spinner
    this.isLoadingResults = !this.isLoadingResults;

    //Verifica se possui parametros para paginação ou sorted
    if (event){
      this.pageable!.number = event?.pageIndex
      this.pageable!.size = event?.pageSize
      this.pageable!.sort.sortField = event.active
      this.pageable!.sort.sortDirection = event.direction

    }

    //chama serviço que faz request à API
    this.service.getAllUsers(this.pageable).subscribe({
      next: (res) => {
        this.pageable = res
        this.dataSource = new MatTableDataSource(this.pageable.content);
        this.isLoadingResults = false; //Fecha loading sppiner
      },
      error: (err) => {
        console.error("Erro ao carregar dados da API: ", err)
        
      }
    });
  }

  openModalNewUser(){
    this.modalNewUser.open(CreateNewUser, {
    maxHeight: '80vh',  // ou 'none' para remover completamente o limite
    maxWidth: '80vw',   // ou 'none'
    height: 'auto',
    width: 'auto',
    });
  }


  edit(userId: number){
    alert(userId)
  }

}
