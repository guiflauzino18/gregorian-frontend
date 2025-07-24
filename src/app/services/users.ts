import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserDTO } from '../../interfaces/user';
import { Pageable } from '../../interfaces/pageable';
import { config } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  private API_URL = environment.apiUrl

  
  private http = inject(HttpClient)

  getAllUsers(pageable?: Pageable<UserDTO>){

    console.log(pageable)
    // Para paginação
    let params = pageable? new HttpParams()
      .set('page', pageable.number)
      .set('size', pageable.size) : new HttpParams();

    //Para ordenação
    if (pageable?.sort.sortField && pageable.sort.sortDirection) {
      console.log(`${pageable.sort.sortField},${pageable.sort.sortDirection}`)
      params = params.set('sort', `${pageable.sort.sortField},${pageable.sort.sortDirection}`);
    }

    const url = `${environment.apiUrl}/admin/user/list`
    return this.http.get<Pageable<UserDTO>>(url, {params});
  }

  createUser(user: UserDTO){
    const url = `${this.API_URL}/admin/user/create`
    return this.http.post(url, user)
  }
}
