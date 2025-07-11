import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class Index {

  private http = inject(HttpClient)
  
  getIndex(){
    const url = `${environment.apiUrl}/index`
    return this.http.get<UserDTO>(url)
  }
}
