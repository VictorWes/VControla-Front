import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { CartaoCredito } from '../models/cartao-credito.model';
import { Compra } from '../models/compra.model';

@Injectable({
  providedIn: 'root',
})
export class CartaoCreditoService {
  private cartoesUrl = `${environment.apiUrl}/cartoes`;
  private comprasUrl = `${environment.apiUrl}/compras`;
  private parcelasUrl = `${environment.apiUrl}/parcelas`;
  private contasUrl = `${environment.apiUrl}/contas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<CartaoCredito[]> {
    return this.http.get<CartaoCredito[]>(this.cartoesUrl);
  }

  criar(cartao: any): Observable<void> {
    return this.http.post<void>(this.cartoesUrl, cartao);
  }

  atualizar(id: string, cartao: any): Observable<void> {
    return this.http.put<void>(`${this.cartoesUrl}/${id}`, cartao);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.cartoesUrl}/${id}`);
  }

  criarCompra(compra: any): Observable<void> {
    return this.http.post<void>(this.comprasUrl, compra);
  }

  listarCompras(cartaoId: string): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.comprasUrl}/cartao/${cartaoId}`);
  }

  listarParcelas(compraId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.parcelasUrl}/compra/${compraId}`);
  }

  pagarParcela(parcelaId: string, contaId: string): Observable<void> {
    return this.http.post<void>(`${this.parcelasUrl}/${parcelaId}/pagar`, {
      contaId,
    });
  }

  estornarParcela(parcelaId: string, contaId: string): Observable<void> {
    return this.http.post<void>(`${this.parcelasUrl}/${parcelaId}/estornar`, {
      contaId,
    });
  }

  listarContas(): Observable<any[]> {
    return this.http.get<any[]>(this.contasUrl);
  }
}
