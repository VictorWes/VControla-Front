import { Component, OnInit } from '@angular/core';
import { Conta } from '../../../../core/models/conta.model';
import { ContaService } from '../../../../core/services/conta.service';
import { MatDialog } from '@angular/material/dialog';
import { ContaDialogComponent } from '../../components/conta-dialog/conta-dialog.component';
import { TipoContaDialogComponent } from '../../components/tipo-conta-dialog/tipo-conta-dialog.component';
import { TipoContaService } from '../../../../core/services/tipo-conta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private tipoContaService: TipoContaService,
    private snackBar: MatSnackBar,
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
            this.snackBar.open('Conta criada com sucesso!', 'Ok', {
              duration: 3000,
              panelClass: ['success-snackbar'],
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            console.error('Erro ao criar conta', err);


            let msgErro = 'Ocorreu um erro ao tentar criar a conta.';
            if (typeof err.error === 'string') {
              msgErro = err.error;
            } else if (err.error?.message) {
              msgErro = err.error.message;
            }

            this.snackBar.open(msgErro, 'Entendi', {
              duration: 5000,
              panelClass: ['warning-snackbar'],
              verticalPosition: 'top',
            });
          },
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

  editarConta(conta: Conta) {
    const dialogRef = this.dialog.open(ContaDialogComponent, {
      width: '400px',
      data: conta,
    });
    dialogRef.afterClosed().subscribe((contaEditada) => {
      if (contaEditada) {
        this.contaService.atualizar(conta.id!, contaEditada).subscribe({
          next: () => {
            this.buscarContas();
            this.snackBar.open('Conta atualizada com sucesso!', 'Ok', {
              duration: 3000,
              panelClass: ['success-snackbar'],
              verticalPosition: 'top',
            });
          },
          error: (err) => {
            console.error('Erro ao atualizar', err);


            let msgErro = 'Ocorreu um erro ao tentar atualizar a conta.';
            if (typeof err.error === 'string') {
              msgErro = err.error;
            } else if (err.error?.message) {
              msgErro = err.error.message;
            }

       
            this.snackBar.open(msgErro, 'Entendi', {
              duration: 5000,
              panelClass: ['warning-snackbar'],
              verticalPosition: 'top',
            });
          },
        });
      }
    });
  }

  excluirConta(conta: Conta) {
    if (!conta.id) return;

    if (confirm(`Tem certeza que deseja excluir a conta "${conta.nome}"?`)) {
      this.contaService.excluir(conta.id).subscribe({
        next: () => {
          this.buscarContas();

          this.snackBar.open('Conta excluída com sucesso!', 'Ok', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top',
          });
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);

          let msg = 'Ocorreu um erro ao tentar excluir a conta.';

          if (typeof err.error === 'string') {
            msg = err.error;
          } else if (err.error?.message) {
            msg = err.error.message;
          }

          this.snackBar.open(msg, 'Entendi', {
            duration: 5000,
            panelClass: ['warning-snackbar'],
            verticalPosition: 'top',
          });
        },
      });
    }
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
            });
          },
          error: (err) => {
            console.error('Erro', err);
            this.snackBar.open('Erro ao criar carteira.', 'Fechar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
