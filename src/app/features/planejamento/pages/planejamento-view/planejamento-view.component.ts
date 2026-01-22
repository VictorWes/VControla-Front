import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinanceiroService } from '../../../../core/services/financeiro.service';
import {
  ItemPlanejamento,
  ResumoFinanceiro,
} from '../../../../core/models/financeiro.model';
import { ContaService } from '../../../../core/services/conta.service';
import { TipoContaService } from '../../../../core/services/tipo-conta.service';

import { ModalSaldoComponent } from '../../components/modal-saldo/modal-saldo.component';
import { ModalGastoComponent } from '../../components/modal-gasto/modal-gasto.component';

@Component({
  selector: 'app-planejamento-view',
  standalone: false,
  templateUrl: './planejamento-view.component.html',
  styleUrl: './planejamento-view.component.scss',
})
export class PlanejamentoViewComponent implements OnInit {
  resumo: ResumoFinanceiro | null = null;
  listaContasReais: any[] = [];
  listaCarteiras: any[] = [];
  carregando = true;

  constructor(
    private financeiroService: FinanceiroService,
    private contaService: ContaService,
    private tipoContaService: TipoContaService, // Serviço das Carteiras
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.carregarDados();
    this.carregarAuxiliares();
  }

  carregarDados() {
    this.carregando = true;
    this.financeiroService.buscarResumo().subscribe({
      next: (dados) => {
        this.resumo = dados;
        this.carregando = false;
      },
    });
  }

  carregarAuxiliares() {
    this.contaService.listar().subscribe((c) => (this.listaContasReais = c));
    this.tipoContaService.listar().subscribe((c) => (this.listaCarteiras = c));
  }

  abrirAdicionarSaldo() {
    const ref = this.dialog.open(ModalSaldoComponent, { width: '300px' });
    ref.afterClosed().subscribe((valor) => {
      if (valor) {
        this.financeiroService
          .adicionarSaldo(valor)
          .subscribe(() => this.carregarDados());
      }
    });
  }

  abrirNovoGasto() {
    const ref = this.dialog.open(ModalGastoComponent, {
      width: '400px',
      data: { carteiras: this.listaCarteiras, contas: this.listaContasReais },
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.financeiroService
          .criarItem(result)
          .subscribe(() => this.carregarDados());
      }
    });
  }

  alternarStatus(item: ItemPlanejamento) {
    this.financeiroService.alternarStatus(item.id).subscribe({
      next: () => this.carregarDados(),
      error: (err) =>
        alert('Erro: ' + (err.error?.message || 'Falha ao atualizar')),
    });
  }
}
