import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  private readonly API_URL = `${environment.apiUrl}/transacoes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.API_URL);
  }

  criar(transacao: Transacao): Observable<void> {
    return this.http.post<void>(this.API_URL, transacao);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  atualizar(id: string, transacao: any): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, transacao);
  }
}
