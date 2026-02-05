import { Component, OnInit } from '@angular/core';
import { Conta } from '../../../../core/models/conta.model';
import { CartaoCredito } from '../../../../core/models/cartao-credito.model';
import { ContaService } from '../../../../core/services/conta.service';
import { CartaoCreditoService } from '../../../../core/services/cartao-credito.service';
import {
  DashboardService,
  ResumoDashboard,
} from '../../../../core/services/dashboard.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
  contas: Conta[] = [];
  cartoes: CartaoCredito[] = [];
  saldoTotal: number = 0;

  resumo: ResumoDashboard = { receitas: 0, despesas: 0, saldo: 0 };

  nomeUsuario: string = '';
  saudacao: string = '';

  constructor(
    private contaService: ContaService,
    private cartaoService: CartaoCreditoService,
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.nomeUsuario$.subscribe((nomeCompleto) => {
      const nome = nomeCompleto || 'Usuário';
      this.nomeUsuario = nome.split(' ')[0];
    });

    this.definirSaudacao();
    this.carregarContas();
    this.carregarCartoes();
    this.carregarResumoMensal();
  }

  definirSaudacao() {
    const hora = new Date().getHours();

    if (hora >= 0 && hora < 12) {
      this.saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }
  }

  carregarContas() {
    this.contaService.listar().subscribe({
      next: (lista) => {
        this.saldoTotal = lista.reduce(
          (total, conta) => total + Number(conta.saldo),
          0,
        );

        this.contas = lista.slice(0, 3);
      },
      error: (err) => console.error('Erro ao carregar contas:', err),
    });
  }

  carregarCartoes() {
    this.cartaoService.listar().subscribe({
      next: (lista) => {
        this.cartoes = lista.slice(0, 3);
      },
      error: (err) => console.error('Erro ao carregar cartões:', err),
    });
  }

  carregarResumoMensal() {
    this.dashboardService.obterResumoMensal().subscribe({
      next: (dados) => {
        this.resumo = dados;
      },
      error: (err) => console.error('Erro ao carregar resumo mensal:', err),
    });
  }
}
