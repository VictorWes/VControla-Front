import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environments/environment';
import { CartaoCredito } from '../models/cartao-credito.model';

@Injectable({
  providedIn: 'root',
})
export class CartaoCreditoService {
  private apiUrl = `${environment.apiUrl}/cartoes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<CartaoCredito[]> {
    return this.http.get<CartaoCredito[]>(this.apiUrl);
  }

  criar(cartao: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, cartao);
  }
}
