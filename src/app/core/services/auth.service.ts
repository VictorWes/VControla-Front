import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioRequest } from '../models/usuario-request.model';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  // Método para cadastrar
  cadastrar(dados: UsuarioRequest): Observable<any> {
    // O .post manda os dados para a URL
    return this.http.post(this.API_URL, dados);
  }

  login(dados: LoginRequest): Observable<LoginResponse> {
    // Note que adicionamos <LoginResponse> aqui
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, dados);
  }
}
