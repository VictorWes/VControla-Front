import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioRequest } from '../models/usuario-request.model';
import { LoginResponse } from '../models/login-response.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PerfilResponse } from '../models/perfil-response.model';
import { SocialAuthService } from '@abacritt/angularx-social-login';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {}

  public nomeUsuario$ = new BehaviorSubject<string>(
    localStorage.getItem('user_nome') || '',
  );

  cadastrar(dados: UsuarioRequest): Observable<any> {
    return this.http.post(this.API_URL, dados);
  }

  login(dados: any) {
    return this.http
      .post<any>(`${this.API_URL}/login`, dados)
      .pipe(tap((response) => this.salvarSessao(response)));
  }

  loginGoogle(googleToken: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/google`, { token: googleToken })
      .pipe(tap((response) => this.salvarSessao(response)));
  }

  private salvarSessao(response: any): void {
    localStorage.setItem('access_token', response.token);

    if (response.nome) {
      this.atualizarNomeLocal(response.nome);
    }

    if (response.email) {
      localStorage.setItem('user_email', response.email);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
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

  logout(): void {
    localStorage.clear();
    this.nomeUsuario$.next('');
    this.socialAuthService.signOut().catch(() => {});
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.disableAutoSelect();
    }
    window.location.href = '/auth/login';
  }

  private finalizarLogout() {
    window.location.href = '/auth/login';
  }
}
