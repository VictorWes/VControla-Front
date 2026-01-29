import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CartaoCreditoService } from '../../../../core/services/cartao-credito.service';
import { CartaoCredito } from '../../../../core/models/cartao-credito.model';
import { Compra } from '../../../../core/models/compra.model';

import { CartaoDialogComponent } from '../../components/cartao-dialog/cartao-dialog.component';
import { CompraDialogComponent } from '../../components/compra-dialog/compra-dialog.component';
import { PagamentoDialogComponent } from '../../components/pagamento-dialog/pagamento-dialog.component';
import { SelecaoContaDialogComponent } from '../../components/selecao-conta-dialog/selecao-conta-dialog.component';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cartoes-view',
  templateUrl: './cartoes-view.component.html',
  standalone: false,
  styleUrls: ['./cartoes-view.component.scss'],
})
export class CartoesViewComponent implements OnInit {
  cartoes: CartaoCredito[] = [];
  cartaoSelecionado: any = null;
  comprasDoCartao: Compra[] = [];
  isLoading = true;

  // Variáveis para paginação
  totalCompras = 0;
  paginaAtual = 0;
  tamanhoPagina = 5;

  constructor(
    private cartaoService: CartaoCreditoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.carregarCartoes();
  }

  carregarCartoes() {
    this.isLoading = true;
    this.cartaoService.listar().subscribe({
      next: (data) => {
        this.cartoes = data;
        this.isLoading = false;

        if (this.cartoes.length > 0) {
          if (this.cartaoSelecionado) {
            const atualizado = this.cartoes.find(
              (c) => c.id === this.cartaoSelecionado.id,
            );
            if (atualizado) {
              this.selecionarCartao(atualizado);
            } else {
              this.selecionarCartao(this.cartoes[0]);
            }
          } else {
            this.selecionarCartao(this.cartoes[0]);
          }
        } else {
          this.cartaoSelecionado = null;
        }
      },
      error: (err) => {
        console.error('Erro ao buscar cartões', err);
        this.isLoading = false;
      },
    });
  }

  carregarCompras(cartaoId: string) {
    this.cartaoService
      .listarCompras(cartaoId, this.paginaAtual, this.tamanhoPagina)
      .subscribe({
        next: (pageData) => {
          this.comprasDoCartao = pageData.content;
          this.totalCompras = pageData.totalElements;

          this.comprasDoCartao.forEach((compra) => {
            this.carregarParcelas(compra);
          });
        },
        error: (err) => console.error('Erro ao buscar compras', err),
      });
  }

  mudarPagina(event: PageEvent) {
    this.paginaAtual = event.pageIndex;
    this.tamanhoPagina = event.pageSize;

    if (this.cartaoSelecionado) {
      this.carregarCompras(this.cartaoSelecionado.id);
    }
  }

  selecionarCartao(cartao: any) {
    this.cartaoSelecionado = cartao;
    this.paginaAtual = 0;
    if (cartao && cartao.id) {
      this.carregarCompras(cartao.id);
    }
  }

  carregarParcelas(compra: any) {
    if (compra.parcelas && compra.parcelas.length > 0) {
      return;
    }

    this.cartaoService.listarParcelas(compra.id).subscribe({
      next: (parcelas) => {
        compra.parcelas = parcelas;
      },
      error: (err) => console.error('Erro ao buscar parcelas', err),
    });
  }

  novaCompra() {
    if (!this.cartaoSelecionado) return;

    const dialogRef = this.dialog.open(CompraDialogComponent, {
      width: '500px',
      data: { cartaoId: this.cartaoSelecionado.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.cartaoService.criarCompra(result).subscribe({
          next: () => {
            this.carregarCartoes();
            this.mostrarMensagem('Compra realizada com sucesso!', 'sucesso');
          },
          error: (err) => {
            console.error('Erro:', err);
            this.isLoading = false;
            const mensagemErro = err.error || 'Erro ao realizar compra.';
            this.mostrarMensagem(mensagemErro, 'erro');
          },
        });
      }
    });
  }

  mostrarMensagem(msg: string, tipo: 'sucesso' | 'erro') {
    this.snackBar.open(msg, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: tipo === 'erro' ? ['snackbar-erro'] : ['snackbar-sucesso'],
    });
  }

  pagarParcela(parcela: any) {
    const dialogRef = this.dialog.open(PagamentoDialogComponent, {
      width: '400px',
      data: { valor: parcela.valorParcela },
    });

    dialogRef.afterClosed().subscribe((contaId) => {
      if (contaId) {

        this.isLoading = true;

        this.cartaoService.pagarParcela(parcela.id, contaId).subscribe({
          next: () => {
            parcela.paga = true;
            this.carregarCartoes();


            this.mostrarMensagem('Pagamento realizado com sucesso!', 'sucesso');
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erro ao pagar parcela', err);
            this.isLoading = false;


            const mensagem = err.error || 'Erro ao processar pagamento.';


            this.mostrarMensagem(mensagem, 'erro');
          },
        });
      }
    });
  }

  novoCartao() {
    const dialogRef = this.dialog.open(CartaoDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.criarCartao(result);
      }
    });
  }

  criarCartao(dados: any) {
    this.isLoading = true;
    this.cartaoService.criar(dados).subscribe({
      next: () => {
        this.carregarCartoes();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  editarCartao(cartao: CartaoCredito) {
    const dialogRef = this.dialog.open(CartaoDialogComponent, {
      width: '450px',
      data: cartao,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.salvarEdicao(cartao.id!, result);
      }
    });
  }

  salvarEdicao(id: string, dados: any) {
    this.isLoading = true;
    this.cartaoService.atualizar(id, dados).subscribe({
      next: () => {
        this.carregarCartoes();
        if (this.cartaoSelecionado && this.cartaoSelecionado.id === id) {
          this.cartaoSelecionado = { ...this.cartaoSelecionado, ...dados };
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar', err);
        this.isLoading = false;
      },
    });
  }

  excluirCartao(cartao: CartaoCredito) {
    if (confirm(`Deseja realmente excluir o cartão ${cartao.nome}?`)) {
      this.isLoading = true;
      this.cartaoService.excluir(cartao.id!).subscribe({
        next: () => {
          this.cartaoSelecionado = null;
          this.carregarCartoes();
        },
        error: (err) => {
          console.error('Erro ao excluir', err);
          this.isLoading = false;
        },
      });
    }
  }

  abrirEdicaoCompra(compra: Compra) {
    const dialogRef = this.dialog.open(CompraDialogComponent, {
      width: '500px',
      data: {
        cartaoId: this.cartaoSelecionado?.id,
        compraEditar: compra,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.cartaoService.editarCompra(compra.id, result).subscribe({
          next: () => {
            this.carregarCartoes();
            this.mostrarMensagem('Compra atualizada!', 'sucesso');
          },
          error: (err) => {
            this.isLoading = false;
            this.mostrarMensagem(err.error || 'Erro ao editar.', 'erro');
          },
        });
      }
    });
  }

  confirmarExclusaoCompra(compra: Compra) {
    if (confirm(`Tem certeza que deseja excluir a compra "${compra.nome}"?`)) {
      this.executarExclusao(compra.id);
    }
  }

  private executarExclusao(compraId: string, contaIdEstorno?: string) {
    this.isLoading = true;

    this.cartaoService.excluirCompra(compraId, contaIdEstorno).subscribe({
      next: () => {
        this.carregarCartoes();
        this.mostrarMensagem('Compra excluída com sucesso!', 'sucesso');
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 422 && err.error) {
          this.abrirModalEstorno(compraId, err.error);
        } else {
          this.mostrarMensagem(err.error || 'Erro ao excluir compra.', 'erro');
        }
      },
    });
  }

  private abrirModalEstorno(compraId: string, mensagemErro: string) {
    const dialogRef = this.dialog.open(SelecaoContaDialogComponent, {
      width: '400px',
      data: { valorEstorno: 0 }, // Opcional: Se tiver o valor no erro, pode passar aqui
    });

    dialogRef.afterClosed().subscribe((contaId) => {
      if (contaId) {
        this.executarExclusao(compraId, contaId);
      }
    });
  }
}
