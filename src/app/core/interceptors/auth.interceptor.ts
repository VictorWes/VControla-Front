import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('access_token');

    let authRequest = request;
    if (token) {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
  
        const urlNavegador = window.location.href;
        const estouEmRotaPublica =
          urlNavegador.includes('/usuarios/conta/nova-senha') ||
          urlNavegador.includes('/usuarios/conta/recuperar-senha') ||
          urlNavegador.includes('/auth/login');


        if (error.status === 401 || error.status === 403) {

          console.group('🚨 Erro de Auth Capturado');

          console.groupEnd();


          if (!estouEmRotaPublica) {
            console.warn(
              '🔒 Sessão inválida em rota privada. Redirecionando...',
            );
            localStorage.clear();
            this.router.navigate(['/auth/login']);
          } else {

          }
        }

        return throwError(() => error);
      }),
    );
  }
}
