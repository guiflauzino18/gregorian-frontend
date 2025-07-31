import { inject, Injectable } from '@angular/core';
import { ProfissionalDTO } from '../../interfaces/profissional';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pageable } from '../../interfaces/pageable';
import { UserDTO } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalServices {

  private API_URL = environment.apiUrl
  private http = inject(HttpClient)

getAllProfissionals( input: string, pageable?: Pageable<ProfissionalDTO>){

    let params = new HttpParams().set('input', input)

    // Para paginação
    if (pageable){
      params = params.append('page', pageable.number)
      params = params.append('size', pageable.size)

      //Para ordenação
      if (pageable.sort.sortField && pageable.sort.sortDirection) {
        params = params.append('sort', `${pageable.sort.sortField},${pageable.sort.sortDirection}`);
      }
    }

    const url = `${environment.apiUrl}/admin/profissional/list`
    return this.http.get<Pageable<ProfissionalDTO>>(url, {params});

  }
  
}
