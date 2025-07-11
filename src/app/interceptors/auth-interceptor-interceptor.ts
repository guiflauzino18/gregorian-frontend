import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  // Ignorar a requisição de login
  if (isLoginRequest(req)) return next(req)

  
  const authService = inject(AuthService)
  const router: Router = new Router();

  const token = authService.getToken();

  if (!token){
    router.navigate(['/login']);
    return throwError(() => new Error('Token não encontrado'))
  }

  //Insere token na requisição
  const requestWithToken = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })

  return next(requestWithToken).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401){
        authService.logout();

      }

      return throwError(() => err);
    })
  )
};

function isLoginRequest(req: HttpRequest<any>): boolean{
  if (req.url.includes('/login')) {
    return true
  }else {
    return false
  }
}
