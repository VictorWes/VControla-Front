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
import { ModalDiminuirSaldoComponent } from '../../components/modal-diminuir-saldo/modal-diminuir-saldo.component';
import { ModalResgatarComponent } from '../../components/modal-resgatar/modal-resgatar.component';
import { TipoContaDialogComponent } from '../../../contas/components/tipo-conta-dialog/tipo-conta-dialog.component';
import { PageEvent } from '@angular/material/paginator';

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

  tamanhoPagina = 10;
  paginaAtual = 0;

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

  get itensPaginados(): ItemPlanejamento[] {
    if (!this.resumo?.itens) return [];

    const inicio = this.paginaAtual * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;

    return this.resumo.itens.slice(inicio, fim);
  }

  mudarPagina(evento: PageEvent) {
    this.paginaAtual = evento.pageIndex;
  }

  private ordenarItens() {
    if (!this.resumo?.itens) return;

    this.resumo.itens.sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'PENDENTE' ? -1 : 1;
      }

      return (a.nomeCarteira || '').localeCompare(b.nomeCarteira || '');
    });

    this.resumo.itens = [...this.resumo.itens];
  }

  carregarDadosResumo() {
    this.carregando = true;
    this.financeiroService.buscarResumo().subscribe({
      next: (dados) => {
        this.resumo = dados;

        this.ordenarItens();
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
        this.listaContasReais = [...contas];
      },
      error: (err) => console.error('Erro ao buscar contas:', err),
    });
  }

  carregarCarteiras() {
    this.tipoContaService.listar().subscribe((carteiras) => {
      this.listaCarteiras = carteiras.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
    });
  }

  alternarStatus(item: ItemPlanejamento) {
    const statusAntigo = item.status;
    const vaiGuardar = statusAntigo === 'PENDENTE';
    const valorItem = Number(item.valor);

    if (vaiGuardar) {
      const saldoVirtualDisponivel = Number(
        this.resumo?.saldoDisponivelVirtual || 0,
      );

      if (valorItem > saldoVirtualDisponivel) {
        this.snackBar.open(
          'Saldo Disponível insuficiente para esta reserva!',
          'Entendi',
          {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['warning-snackbar'],
          },
        );
        return;
      }
    }

    this.financeiroService.alternarStatus(item.id).subscribe({
      next: () => {
        item.status = vaiGuardar ? 'GUARDADO' : 'PENDENTE';

        if (this.resumo) {
          if (vaiGuardar) {
            this.resumo.saldoDisponivelVirtual -= valorItem;
          } else {
            this.resumo.saldoDisponivelVirtual += valorItem;
          }
        }

        const contaAlvo = this.listaContasReais.find(
          (c) => c.id == item.contaDestinoId,
        );

        if (contaAlvo) {
          const saldoContaAtual = Number(contaAlvo.saldo);

          if (vaiGuardar) {
            contaAlvo.saldo = saldoContaAtual + valorItem;
          } else {
            contaAlvo.saldo = saldoContaAtual - valorItem;
          }
        }

        this.ordenarItens();

        setTimeout(() => {
          this.carregarDadosResumo();
          this.carregarContasReais();
        }, 200);

        this.snackBar.open(
          vaiGuardar ? 'Valor guardado!' : 'Valor estornado!',
          'Ok',
          {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          },
        );
      },

      error: (err) => {
        item.status = statusAntigo;

        console.error('Erro no alternarStatus:', err);

        let msg = 'Erro ao atualizar.';

        if (typeof err.error === 'string') {
          msg = err.error;
        } else if (err.error?.message) {
          msg = err.error.message;
        }

        this.snackBar.open(msg, 'Entendi', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['warning-snackbar'],
        });
      },
    });
  }

  abrirNovaCarteira() {
    const dialogRef = this.dialog.open(TipoContaDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((nomeDigitado) => {
      if (nomeDigitado) {
        this.tipoContaService.criar(nomeDigitado).subscribe({
          next: () => {
            this.snackBar.open('Carteira criada com sucesso!', 'OK', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });

            this.carregarCarteiras();
          },
          error: (err) => {
            console.error('Erro', err);
            this.snackBar.open('Erro ao criar carteira.', 'Fechar', {
              duration: 3000,
              panelClass: ['warning-snackbar'],
            });
          },
        });
      }
    });
  }

  editarCarteira(carteira: any) {
    const dialogRef = this.dialog.open(TipoContaDialogComponent, {
      width: '400px',
      data: carteira.nome,
    });

    dialogRef.afterClosed().subscribe((novoNome) => {
      if (novoNome && novoNome !== carteira.nome) {
        this.tipoContaService.atualizar(carteira.id, novoNome).subscribe({
          next: () => {
            this.carregarCarteiras();
            this.carregarDadosResumo();
            this.snackBar.open('Carteira atualizada!', 'OK', {
              panelClass: ['success-snackbar'],
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Erro ao atualizar.', 'Fechar', {
              panelClass: ['warning-snackbar'],
              verticalPosition: 'top',
            });
          },
        });
      }
    });
  }

  excluirCarteira(carteira: any) {
    if (
      confirm(`Tem certeza que deseja excluir a carteira "${carteira.nome}"?`)
    ) {
      this.tipoContaService.excluir(carteira.id).subscribe({
        next: () => {
          this.carregarCarteiras();
          this.snackBar.open('Carteira excluída.', 'OK', {
            panelClass: ['warning-snackbar'],
            verticalPosition: 'top',
          });
        },
        error: (err) => {
          console.error(err);
          let msg = 'Erro ao excluir carteira.';
          if (err.error?.message) msg = err.error.message;

          this.snackBar.open(msg, 'Entendi', {
            duration: 5000,
            panelClass: ['warning-snackbar'],
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  abrirAdicionarSaldo() {
    const ref = this.dialog.open(ModalSaldoComponent, { width: '300px' });
    ref.afterClosed().subscribe((valor) => {
      if (valor) {
        this.financeiroService.adicionarSaldo(valor).subscribe(() => {
          this.carregarDadosResumo();
          this.snackBar.open('Saldo adicionado!', 'Ok', {
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
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
          this.snackBar.open('Planejamento criado!', 'Ok', {
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        });
      }
    });
  }

  abrirDiminuirSaldo() {
    const ref = this.dialog.open(ModalDiminuirSaldoComponent, {
      width: '300px',
    });
    ref.afterClosed().subscribe((valor) => {
      if (valor) {
        const valorNegativo = valor * -1;
        this.financeiroService.adicionarSaldo(valorNegativo).subscribe(() => {
          this.carregarDadosResumo();
          this.snackBar.open('Saldo diminuído com sucesso!', 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['warning-snackbar'],
          });
        });
      }
    });
  }

  editarItem(item: ItemPlanejamento) {
    const ref = this.dialog.open(ModalGastoComponent, {
      width: '400px',
      data: {
        carteiras: this.listaCarteiras,
        contas: this.listaContasReais,
        itemParaEditar: item,
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.financeiroService.atualizarItem(item.id, result).subscribe(() => {
          this.carregarDadosResumo();
          this.carregarContasReais();
          this.snackBar.open('Item atualizado!', 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
        });
      }
    });
  }

  excluirItem(item: ItemPlanejamento) {
    const nomeExibicao = item.nomeCarteira || 'este item';
    if (confirm(`Tem certeza que deseja excluir "${nomeExibicao}"?`)) {
      this.financeiroService.excluirItem(item.id).subscribe({
        next: () => {
          this.carregarDadosResumo();
          this.carregarContasReais();
          this.snackBar.open('Item excluído com sucesso.', 'Ok', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['warning-snackbar'],
          });
        },
        error: (err) => {
          console.error(err);
          let msg = 'Erro ao excluir item.';
          if (err.error?.message) msg = err.error.message;

          this.snackBar.open(msg, 'Fechar', {
            verticalPosition: 'top',
            panelClass: ['warning-snackbar'],
          });
        },
      });
    }
  }

  abrirResgate(item: ItemPlanejamento) {
    const ref = this.dialog.open(ModalResgatarComponent, {
      width: '350px',
      data: { descricao: item.nomeCarteira, saldoAtual: item.valor },
    });

    ref.afterClosed().subscribe((valorResgate) => {
      if (valorResgate) {
        this.financeiroService
          .resgatarParcial(item.id, valorResgate)
          .subscribe({
            next: () => {
              item.valor = Number(item.valor) - Number(valorResgate);
              setTimeout(() => {
                this.carregarDadosResumo();
                this.carregarContasReais();
              }, 500);
              this.snackBar.open('Resgate realizado com sucesso!', 'Ok', {
                panelClass: ['success-snackbar'],
                verticalPosition: 'top',
              });
            },
            error: (err) => {
              console.error(err);
              this.snackBar.open('Erro ao resgatar.', 'Fechar', {
                panelClass: ['warning-snackbar'],
              });
            },
          });
      }
    });
  }

  temItensGuardados(): boolean {
    return this.resumo?.itens?.some((i) => i.status === 'GUARDADO') ?? false;
  }

  calcularTotalGuardado(): number {
    return (
      this.resumo?.itens
        ?.filter((i) => i.status === 'GUARDADO')
        .reduce((acc, curr) => acc + Number(curr.valor), 0) ?? 0
    );
  }
}
