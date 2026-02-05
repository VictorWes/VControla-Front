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
        if (error.status === 401) {
          console.warn(
            'Erro 401: Token expirado ou inválido. Fazendo logout...',
          );
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_nome');
          this.router.navigate(['/auth/login']);
        }

        if (error.status === 403) {
          console.error(
            'Erro 403 (Forbidden): A requisição foi recusada pelo servidor',
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
