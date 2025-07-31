import { Component, inject } from '@angular/core';
import { M } from "../../../../node_modules/@angular/material/paginator.d-DuJ-oYgT";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { ProfissionalServices } from '../../services/profissional';
import { Pageable } from '../../../interfaces/pageable';
import { ProfissionalDTO } from '../../../interfaces/profissional';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateProfissional } from './modal/create/create';

@Component({
  selector: 'app-profissionais',
  imports: [ReactiveFormsModule,MatPaginator, MatTableModule, MatProgressSpinnerModule, MatSortModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './profissionais.html',
  styleUrl: './profissionais.css'
})
export class Profissionais {

  private service = inject(ProfissionalServices)
  protected pageable: Pageable<ProfissionalDTO> = {
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
  protected isLoadingResult = false;
  protected search = new FormControl('');
  columns: string[] = ['id', 'nome', 'sobrenome', 'login', 'registro', 'agenda', 'status', 'opcoes'];
  dataSource: MatTableDataSource<ProfissionalDTO> | undefined;
  readonly modalNewProfissional = inject(MatDialog)

  constructor(){
    this.getAllProfissionals()

  }

  openModalNewProfissionals(){
    this.modalNewProfissional.open(CreateProfissional, {
      disableClose: true
    })
  }


  getAllProfissionals(event?: any){

    this.isLoadingResult = true;
       
    //Verifica se possui parametros para paginação ou sorted
    if (event){
      this.pageable.number = event?.pageIndex
      this.pageable.size = event?.pageSize
      this.pageable.sort.sortField = event.active
      this.pageable.sort.sortDirection = event.direction

    }

    const input = this.search.value ? this.search.value : ''

    //chama serviço que faz request à API
    this.service.getAllProfissionals(input, this.pageable).subscribe({
      next: (res) => {
        this.pageable = res
        this.dataSource = new MatTableDataSource(this.pageable.content);
        this.isLoadingResult = false; //Fecha loading sppiner
      },
      error: (err) => {
        console.error("Erro ao carregar dados da API: ", err)
      }
    });

  }

  edit(profissionalId: number){

  }

  searchProfissional(){

  }

}
