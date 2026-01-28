import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Services e Models
import { CartaoCreditoService } from '../../../../core/services/cartao-credito.service';
import { CartaoCredito } from '../../../../core/models/cartao-credito.model';

// Componentes de Dialog
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

  // Usamos 'any' aqui para aceitar o campo 'valorFaturaAtual' que vem do backend
  // sem precisar alterar a interface CartaoCredito imediatamente.
  cartaoSelecionado: any = null;

  comprasDoCartao: any[] = []; // Lista de compras para o accordion
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

        // Lógica inteligente de seleção:
        if (this.cartoes.length > 0) {
          if (this.cartaoSelecionado) {
            // Se já tinha um selecionado, tenta encontrar ele de novo na lista atualizada
            // para pegar os valores novos (limite, fatura, etc)
            const atualizado = this.cartoes.find(
              (c) => c.id === this.cartaoSelecionado.id,
            );
            if (atualizado) {
              this.selecionarCartao(atualizado);
            } else {
              this.selecionarCartao(this.cartoes[0]);
            }
          } else {
            // Se não tinha nada selecionado, pega o primeiro
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

  // === LÓGICA DE COMPRAS E PARCELAS ===

  carregarCompras(cartaoId: string) {
    this.cartaoService.listarCompras(cartaoId).subscribe({
      next: (data) => {
        this.comprasDoCartao = data;
      },
      error: (err) => console.error('Erro ao buscar compras', err),
    });
  }

  // Chamado quando o usuário expande o item no Accordion (Lazy Loading)
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
      width: '400px',
      data: { cartaoId: this.cartaoSelecionado.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.cartaoService.criarCompra(result).subscribe({
          next: () => {
            this.carregarCartoes(); // Recarrega cartão (limite/fatura) e compras
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
    // 1. Abre o modal para escolher a conta
    const dialogRef = this.dialog.open(PagamentoDialogComponent, {
      width: '400px',
      data: { valor: parcela.valorParcela },
    });

    // 2. Se retornou um ID de conta, executa o pagamento
    dialogRef.afterClosed().subscribe((contaId) => {
      if (contaId) {
        this.cartaoService.pagarParcela(parcela.id, contaId).subscribe({
          next: () => {
            parcela.paga = true; // Atualiza visualmente
            this.carregarCartoes(); // Atualiza saldos gerais
          },
          error: (err) => console.error('Erro ao pagar parcela', err),
        });
      }
    });
  }

  // === LÓGICA DE CRUD DE CARTÕES (Mantida) ===

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
        // Atualiza localmente para refletir sem piscar
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
