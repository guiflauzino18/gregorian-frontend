import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserDTO, UserResetPassword } from '../../interfaces/user';
import { Pageable } from '../../interfaces/pageable';
import { ResponseDTO } from '../../interfaces/responseDTO';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  private API_URL = environment.apiUrl

  
  private http = inject(HttpClient)

  getUserById(id: number){
    const params = new HttpParams().set('id', id)
    const url = `${this.API_URL}/admin/user/byid`
    return this.http.get<UserDTO>(url, {params})
  }

  getAllUsers( input: string, pageable?: Pageable<UserDTO>){

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

    const url = `${environment.apiUrl}/admin/user/list`
    return this.http.get<Pageable<UserDTO>>(url, {params});

  }

  createUser(user: UserDTO){
    const url = `${this.API_URL}/admin/user/create`
    return this.http.post(url, user)
  }

  editUser(user: UserDTO){
    const url = `${this.API_URL}/admin/user/edit`
    return this.http.put(url, user)
  }

  blockUser(userId: number){
    const url = `${this.API_URL}/admin/user/block/${userId}`
    return this.http.patch(url, null)
  }

  resetPassword(data: UserResetPassword){
    const url = `${this.API_URL}/admin/user/resetsenha`
    return this.http.put<ResponseDTO>(url, data)
  }

  deleteUser(userId: number){
    const url = `${this.API_URL}/admin/user/delete/${userId}`
    return this.http.delete<ResponseDTO>(url)
  }

}
