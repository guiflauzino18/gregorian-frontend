import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserDTO } from '../../interfaces/user';
import { Pageable } from '../../interfaces/pageable';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {
  
  private http = inject(HttpClient)

  getAllUsers(){
    const url = `${environment.apiUrl}/admin/user/list`
    return this.http.get<Pageable<UserDTO>>(url);
  }
}
