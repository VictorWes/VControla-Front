import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioRequest } from '../models/usuario-request.model';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PerfilResponse } from '../models/perfil-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public nomeUsuario$ = new BehaviorSubject<string>(
    localStorage.getItem('user_nome') || '',
  );

  cadastrar(dados: UsuarioRequest): Observable<any> {
    return this.http.post(this.API_URL, dados);
  }

  login(dados: any) {
    return this.http.post<any>(`${this.API_URL}/login`, dados).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.token);
        this.atualizarNomeLocal(response.nome);
      }),
    );
  }

  loginGoogle(googleToken: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/google`, { token: googleToken })
      .pipe(tap((response) => this.salvarSessao(response)));
  }

  private salvarSessao(response: LoginResponse): void {
    localStorage.setItem('access_token', response.token);
    if (response.nome) {
      localStorage.setItem('user_nome', response.nome);
    }
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

  buscarPerfil(): Observable<PerfilResponse> {
    return this.http.get<PerfilResponse>(`${this.API_URL}/me`);
  }

  atualizarPerfil(dados: { nome: string; email: string }): Observable<any> {
    return this.http.put(`${this.API_URL}/perfil`, dados);
  }

  alterarSenha(dados: {
    senhaAtual: string;
    novaSenha: string;
  }): Observable<any> {
    return this.http.patch(`${this.API_URL}/senha`, dados);
  }

  atualizarNomeLocal(novoNome: string) {
    localStorage.setItem('user_nome', novoNome);
    this.nomeUsuario$.next(novoNome);
  }

  recuperarSenha(email: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/conta/recuperar-senha`, {
      email,
    });
  }

  redefinirSenha(token: string, novaSenha: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/conta/redefinir-senha`, {
      token,
      novaSenha,
    });
  }
}
