import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao.model';

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  private readonly API_URL = 'http://localhost:8080/transacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.API_URL);
  }

  criar(transacao: Transacao): Observable<void> {
    return this.http.post<void>(this.API_URL, transacao);
  }
}
