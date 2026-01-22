import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinanceiroService } from '../../../../core/services/financeiro.service';
import { ContaService } from '../../../../core/services/conta.service';
import { TipoContaService } from '../../../../core/services/tipo-conta.service';
import {
  ResumoFinanceiro,
  ItemPlanejamento,
} from '../../../../core/models/financeiro.model';
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
    private tipoContaService: TipoContaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.carregarDadosResumo();
    this.carregarContasReais();
    this.carregarCarteiras();
  }

  carregarDadosResumo() {
    this.carregando = true;
    this.financeiroService.buscarResumo().subscribe({
      next: (dados) => {
        this.resumo = dados;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar resumo:', err);
        this.carregando = false;
      },
    });
  }

  carregarContasReais() {
    this.contaService.listar().subscribe({
      next: (contas) => {
        console.log('Contas atualizadas recebidas:', contas);

        this.listaContasReais = [...contas];
      },
      error: (err) => console.error('Erro ao buscar contas:', err),
    });
  }

  carregarCarteiras() {
    this.tipoContaService.listar().subscribe((carteiras) => {
      this.listaCarteiras = carteiras;
    });
  }

  abrirAdicionarSaldo() {
    const ref = this.dialog.open(ModalSaldoComponent, { width: '300px' });
    ref.afterClosed().subscribe((valor) => {
      if (valor) {
        this.financeiroService.adicionarSaldo(valor).subscribe(() => {
          this.carregarDadosResumo();
        });
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
        this.financeiroService.criarItem(result).subscribe(() => {
          this.carregarDadosResumo();
          this.carregarContasReais();
        });
      }
    });
  }

  alternarStatus(item: ItemPlanejamento) {
    const statusAntigo = item.status;
    const vaiGuardar = statusAntigo === 'PENDENTE';

    this.financeiroService.alternarStatus(item.id).subscribe({
      next: () => {
        const contaAlvo = this.listaContasReais.find(
          (c) => c.id == item.contaDestinoId,
        );
        if (contaAlvo) {
          const valorItem = Number(item.valor);
          const saldoAtual = Number(contaAlvo.saldo);

          if (vaiGuardar) {
            contaAlvo.saldo = saldoAtual - valorItem;
          } else {
            contaAlvo.saldo = saldoAtual + valorItem;
          }

          this.listaContasReais = [...this.listaContasReais];
        }

        item.status = vaiGuardar ? 'GUARDADO' : 'PENDENTE';

        setTimeout(() => {
          this.carregarDadosResumo();
          this.carregarContasReais();
        }, 1);

        // Feedback
        this.snackBar.open('Saldo atualizado!', 'Ok', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        // Rollback visual em caso de erro
        item.status = statusAntigo;
        console.error(err);

        this.snackBar.open('Erro ao atualizar.', 'Fechar', {
          verticalPosition: 'top',
          panelClass: ['warning-snackbar'],
        });
      },
    });
  }
}
