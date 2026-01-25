import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface ResumoDashboard {
  receitas: number;
  despesas: number;
  saldo: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly API_URL = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  obterResumoMensal(): Observable<ResumoDashboard> {
    return this.http.get<ResumoDashboard>(`${this.API_URL}/resumo-mensal`);
  }
}
