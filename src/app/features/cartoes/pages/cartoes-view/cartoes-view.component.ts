import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CartaoCreditoService } from '../../../../core/services/cartao-credito.service';
import { CartaoCredito } from '../../../../core/models/cartao-credito.model';

import { CartaoDialogComponent } from '../../components/cartao-dialog/cartao-dialog.component';
import { CompraDialogComponent } from '../../components/compra-dialog/compra-dialog.component';
import { PagamentoDialogComponent } from '../../components/pagamento-dialog/pagamento-dialog.component';

@Component({
  selector: 'app-cartoes-view',
  templateUrl: './cartoes-view.component.html',
  standalone: false,
  styleUrls: ['./cartoes-view.component.scss'],
})
export class CartoesViewComponent implements OnInit {
  cartoes: CartaoCredito[] = [];

  cartaoSelecionado: any = null;

  comprasDoCartao: any[] = [];
  isLoading = true;

  constructor(
    private cartaoService: CartaoCreditoService,
    private dialog: MatDialog,
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

  selecionarCartao(cartao: any) {
    this.cartaoSelecionado = cartao;
    if (cartao && cartao.id) {
      this.carregarCompras(cartao.id);
    }
  }

  carregarCompras(cartaoId: string) {
    this.cartaoService.listarCompras(cartaoId).subscribe({
      next: (data) => {
        this.comprasDoCartao = data;
      },
      error: (err) => console.error('Erro ao buscar compras', err),
    });
  }

  carregarParcelas(compra: any) {
    if (!compra.parcelas) {
      this.cartaoService.listarParcelas(compra.id).subscribe({
        next: (parcelas) => {
          compra.parcelas = parcelas;
        },
        error: (err) => console.error('Erro ao buscar parcelas', err),
      });
    }
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
          },
          error: (err) => {
            console.error('Erro ao criar compra', err);
            this.isLoading = false;
          },
        });
      }
    });
  }
  pagarParcela(parcela: any) {
    const dialogRef = this.dialog.open(PagamentoDialogComponent, {
      width: '400px',
      data: { valor: parcela.valorParcela },
    });

    dialogRef.afterClosed().subscribe((contaId) => {
      if (contaId) {
        this.cartaoService.pagarParcela(parcela.id, contaId).subscribe({
          next: () => {
            parcela.paga = true;
            this.carregarCartoes();
          },
          error: (err) => console.error('Erro ao pagar parcela', err),
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
}
