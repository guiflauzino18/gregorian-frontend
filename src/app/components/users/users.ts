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
import {MatDialog} from '@angular/material/dialog';
import { CreateUser } from './modal/create/create';
import { EditUser } from './modal/edit/edit';
import { hideLoading, showConfirm, showLoading, showLoadingError, showLoadingSuccess } from '../../../utils/popup';
import { reload } from '../../../utils/loader';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ResetUserPassword } from './modal/reset/reset';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule,MatPaginator, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements AfterViewInit{

  private service = inject(UsersServices)
  protected pageable: Pageable<UserDTO> = {
    content: [],
    empty: true,
    first: true,
    last: false,
    number: 0,
    numberOfElements: 0,
    size: 10,
    sort: {
      empty: true,
      sortDirection: "desc",
      sorted: false,
      sortField: "id",
      unsorted: true
    },
    totalElements: 0,
    totalPages: 0

  }
  columns: string[] = ['id', 'nome', 'sobrenome', 'login', 'grupo', 'status', 'opcoes'];
  dataSource: MatTableDataSource<UserDTO> | undefined;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  readonly modalNewUser = inject(MatDialog);
  readonly modalEditUser = inject(MatDialog);
  readonly modalResetPassword = inject(MatDialog);
  search = new FormControl('');

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
      this.pageable.number = event?.pageIndex
      this.pageable.size = event?.pageSize
      this.pageable.sort.sortField = event.active
      this.pageable.sort.sortDirection = event.direction

    }

    const input = this.search.value ? this.search.value : ''

    //chama serviço que faz request à API
    this.service.getAllUsers(input, this.pageable).subscribe({
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
    this.modalNewUser.open(CreateUser, {
    maxHeight: '80vh',  // ou 'none' para remover completamente o limite
    maxWidth: '80vw',   // ou 'none'
    height: 'auto',
    width: 'auto',
    disableClose: true,
    });
  }

  openModalEditUser(user: UserDTO){
    this.modalEditUser.open(EditUser, {
    maxHeight: '80vh',  // ou 'none' para remover completamente o limite
    maxWidth: '80vw',   // ou 'none'
    height: 'auto',
    width: 'auto',
    data: user,
    disableClose: true,
    });
  }

  openModalResetPassword(data: number){
    this.modalResetPassword.open(ResetUserPassword, {data});
  }

  edit(userId: number){
    showLoading()

    this.service.getUserById(userId).subscribe({
      next: (resp) => {
        this.openModalEditUser(resp)
        hideLoading()
      },
      error: (err) => {
        console.error("Erro ao buscar dados do usuário: "+err)
        showLoadingError("Erro ao buscar dados do usuário")
      }
    })
  }

  block(userId: number){
    showConfirm({
      title: "Deseja Prosseguir?",
      callback: () => {
        showLoading()
        this.service.blockUser(userId).subscribe({
          next: (resp) => {
            showLoadingSuccess("Usuário atualizado.", reload)
          },
          error: (err) => {
            const title: string = err.status == "404" ? "Usuário não encontrado" :  "Erro ao atualizar este usuário."
            console.error(err)
            showLoadingError(title, reload)
          }
        })
      }
    })
  }

  searchUser(){

    const input = this.search.value

    if(input && input.length! > 1){
      this.getAllusers();
    }

    //   this.isLoadingResults = true;

    //   this.service.search(input, this.pageable).subscribe({
    //     next: (res) => {
    //     this.pageable = res
    //     this.dataSource = new MatTableDataSource(this.pageable.content);
    //     this.isLoadingResults = false; //Fecha loading sppiner

    //     },
    //     error: (err) => {
    //       console.error(err)
    //     }
    //   })
    // }else {
    //   this.getAllusers()
    // }

  }

  resetPassword(userId: number){
    this.openModalResetPassword(userId)
  }


}
