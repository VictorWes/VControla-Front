import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ResumoFinanceiro,
  ItemPlanejamentoRequest,
} from '../models/financeiro.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  private readonly API_URL = 'http://localhost:8080/financeiro';

  constructor(private http: HttpClient) {}

  buscarResumo(): Observable<ResumoFinanceiro> {
    return this.http.get<ResumoFinanceiro>(this.API_URL);
  }

  adicionarSaldo(valor: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/saldo`, { valor });
  }

  criarItem(item: ItemPlanejamentoRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/item`, item);
  }

  alternarStatus(id: string): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/item/${id}/alternar`, {});
  }

  excluirItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/item/${id}`);
  }

  atualizarItem(id: string, dados: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/item/${id}`, dados);
  }

  resgatarParcial(id: string, valor: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/item/${id}/resgatar`, {
      valor,
    });
  }
}
