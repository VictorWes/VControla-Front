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
        // 1. Pega a URL diretamente do navegador (Nativo)
        const urlNavegador = window.location.href;

        // 2. Define as rotas que SÃO PÚBLICAS e não devem sofrer redirect forçado
        const estouEmRotaPublica =
          urlNavegador.includes('/usuarios/conta/nova-senha') ||
          urlNavegador.includes('/usuarios/conta/recuperar-senha') ||
          urlNavegador.includes('/auth/login');

        // Lógica de Redirecionamento
        if (error.status === 401 || error.status === 403) {
          // LOG DE DEBUG (Para entendermos o que está acontecendo)
          console.group('🚨 Erro de Auth Capturado');
          console.log('URL da API que falhou:', request.url);
          console.log('Onde eu estou no navegador:', urlNavegador);
          console.log('É rota pública?', estouEmRotaPublica);
          console.groupEnd();

          // Se NÃO for rota pública, aí sim chuta para o login
          if (!estouEmRotaPublica) {
            console.warn(
              '🔒 Sessão inválida em rota privada. Redirecionando...',
            );
            localStorage.clear();
            this.router.navigate(['/auth/login']);
          } else {
            console.log(
              '✅ Estou em rota pública. Ignorando redirecionamento.',
            );
          }
        }

        return throwError(() => error);
      }),
    );
  }
}
