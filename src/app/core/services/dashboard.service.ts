import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResumoDashboard {
  receitas: number;
  despesas: number;
  saldo: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly API_URL = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  obterResumoMensal(): Observable<ResumoDashboard> {
    return this.http.get<ResumoDashboard>(`${this.API_URL}/resumo-mensal`);
  }
}
