import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CartaoCreditoService } from '../../../../core/services/cartao-credito.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-pagamento-dialog',
  standalone: false,
  templateUrl: './pagamento-dialog.component.html',
  styleUrl: './pagamento-dialog.component.scss',
})
export class PagamentoDialogComponent implements OnInit {
  contas: any[] = [];
  contaSelecionadaId: string | null = null;
  isLoading = false;

  constructor(
    private service: CartaoCreditoService,
    public dialogRef: MatDialogRef<PagamentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { valor: number },
  ) {}

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas() {
    this.isLoading = true;
    this.service.listarContas().subscribe({
      next: (dados) => {
        this.contas = dados;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar contas', err);
        this.isLoading = false;
      },
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.contaSelecionadaId) {
      this.dialogRef.close(this.contaSelecionadaId);
    }
  }
}
