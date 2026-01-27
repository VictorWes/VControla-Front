import { Component, OnInit } from '@angular/core';
import { CartaoCreditoService } from '../../../../core/services/cartao-credito.service';
import { CartaoCredito } from '../../../../core/models/cartao-credito.model';
import { MatDialog } from '@angular/material/dialog';
import { CartaoDialogComponent } from '../../components/cartao-dialog/cartao-dialog.component';

@Component({
  selector: 'app-cartoes-view',
  templateUrl: './cartoes-view.component.html',
  standalone: false,
  styleUrls: ['./cartoes-view.component.scss'],
})
export class CartoesViewComponent implements OnInit {
  cartoes: CartaoCredito[] = [];
  cartaoSelecionado: CartaoCredito | null = null;
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

        if (this.cartoes.length > 0 && !this.cartaoSelecionado) {
          this.cartaoSelecionado = this.cartoes[0];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar cartões', err);
        this.isLoading = false;
      },
    });
  }

  selecionarCartao(cartao: CartaoCredito) {
    this.cartaoSelecionado = cartao;
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
}
