import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService, LoginRequest } from '../../services/auth-service';
import { Router } from '@angular/router';
import { reload } from '../../../utils/loader';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  ngOnInit(): void {
    if (this.authService.isLogged()){
      this.router.navigate(['/'])
    }
  }

  private authService = inject(AuthService)
  private router = inject(Router)
  public responseError: string | null = null

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  get login (){
    return this.loginForm.get('login');
  }

  get senha(){
    return this.loginForm.get( 'senha');
  }

  onSubmit(){
    if (this.loginForm.valid){

      const loginRequest: LoginRequest = {
        login: this.login?.value ?? '',
        password: this.senha?.value ?? ''
      }

      this.authService.login(loginRequest).subscribe({
        next: async (r) => {
          this.authService.setToken(r.token, r.id)
          this.router.navigate([''])
          reload()
        },
        error: (e) => {
          this.responseError = e;
          console.error("Erro de login: ", e)
        }
      })
      
    }
  }

}
