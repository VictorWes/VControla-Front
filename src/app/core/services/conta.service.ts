import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta.model';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private readonly API_URL = 'http://localhost:8080/contas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.API_URL);
  }
  criar(conta: Conta): Observable<void> {
    return this.http.post<void>(this.API_URL, conta);
  }

  atualizar(id: string, conta: Conta): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, conta);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
