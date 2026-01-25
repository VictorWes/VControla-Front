import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta.model';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private readonly API_URL = `${environment.apiUrl}/contas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    const timestamp = new Date().getTime();

    return this.http.get<any[]>(`${this.API_URL}?t=${timestamp}`);
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
