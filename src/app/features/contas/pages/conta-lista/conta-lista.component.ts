import { Component, OnInit } from '@angular/core';
import { Conta } from '../../../../core/models/conta.model';
import { ContaService } from '../../../../core/services/conta.service';
import { MatDialog } from '@angular/material/dialog';
import { ContaDialogComponent } from '../../components/conta-dialog/conta-dialog.component';

@Component({
  selector: 'app-conta-lista',
  standalone: false,
  templateUrl: './conta-lista.component.html',
  styleUrl: './conta-lista.component.scss',
})
export class ContaListaComponent implements OnInit {
  listaContas: Conta[] = [];

  constructor(
    private contaService: ContaService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.buscarContas();
  }

  buscarContas() {
    this.contaService.listar().subscribe({
      next: (dados) => (this.listaContas = dados),
      error: (err) => console.error('Erro ao buscar contas', err),
    });
  }

  abrirModalNovaConta() {
    const dialogRef = this.dialog.open(ContaDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((contaCriada) => {
      if (contaCriada) {
        this.contaService.criar(contaCriada).subscribe({
          next: () => {
            this.buscarContas();
          },
          error: (err) => alert('Erro ao criar conta: ' + err.message),
        });
      }
    });
  }

  getIcone(tipo: string): string {
    switch (tipo) {
      case 'CONTA_CORRENTE':
        return 'account_balance';

      case 'ESPECIE':
        return 'payments';

      case 'CREDITO':
        return 'credit_card';

      default:
        return 'account_balance_wallet';
    }
  }

  formatarTipo(tipo: string): string {
    const labels: any = {
      CONTA_CORRENTE: 'Conta Corrente',
      ESPECIE: 'Dinheiro em Espécie',
      CREDITO: 'Cartão de Crédito',
    };
    return labels[tipo] || tipo;
  }
}
