import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDTO } from '../../../interfaces/user';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  user = input<UserDTO>();
  logout = output<boolean>();

  onClick(){
    this.logout.emit(true)
  }

}
