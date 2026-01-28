import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { CartaoCredito } from '../models/cartao-credito.model';

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

  // === MÉTODOS DE COMPRAS (Agora usam /compras) ===
  criarCompra(compra: any): Observable<void> {
    // CORRIGIDO: Usa this.comprasUrl
    return this.http.post<void>(this.comprasUrl, compra);
  }

  listarCompras(cartaoId: string): Observable<any[]> {
    // CORRIGIDO: Usa this.comprasUrl/cartao/...
    return this.http.get<any[]>(`${this.comprasUrl}/cartao/${cartaoId}`);
  }

  // === MÉTODOS DE PARCELAS (Agora usam /parcelas) ===
  listarParcelas(compraId: string): Observable<any[]> {
    // CORRIGIDO: Usa this.parcelasUrl/compra/...
    return this.http.get<any[]>(`${this.parcelasUrl}/compra/${compraId}`);
  }

  pagarParcela(parcelaId: string, contaId: string): Observable<void> {
    // CORRIGIDO: Usa this.parcelasUrl/.../pagar
    return this.http.post<void>(`${this.parcelasUrl}/${parcelaId}/pagar`, {
      contaId,
    });
  }

  estornarParcela(parcelaId: string, contaId: string): Observable<void> {
    // CORRIGIDO: Usa this.parcelasUrl/.../estornar
    return this.http.post<void>(`${this.parcelasUrl}/${parcelaId}/estornar`, {
      contaId,
    });
  }

  // === MÉTODOS DE CONTAS (Agora usam /contas) ===
  listarContas(): Observable<any[]> {
    // CORRIGIDO: Usa this.contasUrl (para popular o dropdown de pagamento)
    return this.http.get<any[]>(this.contasUrl);
  }
}
