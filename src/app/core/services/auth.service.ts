import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioRequest } from '../models/usuario-request.model';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  cadastrar(dados: UsuarioRequest): Observable<any> {
    return this.http.post(this.API_URL, dados);
  }

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, dados).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.token);

        if (response.nome) {
          localStorage.setItem('user_nome', response.nome);
        }
      }),
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_nome');
    this.router.navigate(['/auth/login']);
  }
}
