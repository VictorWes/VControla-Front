import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoConta } from '../models/tipo-conta.model';

@Injectable({
  providedIn: 'root',
})
export class TipoContaService {
  private readonly API_URL = 'http://localhost:8080/tipos-conta';

  constructor(private http: HttpClient) {}

  listar(): Observable<TipoConta[]> {
    return this.http.get<TipoConta[]>(this.API_URL);
  }


  criar(nome: string): Observable<void> {
    const payload = {
      nome: nome,
      icone: 'wallet',
      comportamento: 'ESPECIE',
    };
    return this.http.post<void>(this.API_URL, payload);
  }

  atualizar(id: string, nome: string): Observable<void> {
    const payload = { nome: nome };
    return this.http.put<void>(`${this.API_URL}/${id}`, payload);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

