import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { UserDTO } from '../interfaces/user';
import { Index } from './services';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{

  protected title = 'gregorian-frontend';


}
