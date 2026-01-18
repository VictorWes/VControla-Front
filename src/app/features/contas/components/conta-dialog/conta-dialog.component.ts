import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Conta, TipoConta } from '../../../../core/models/conta.model';



@Component({
  selector: 'app-conta-dialog',
  standalone: false,
  templateUrl: './conta-dialog.component.html',
  styleUrl: './conta-dialog.component.scss',
})
export class ContaDialogComponent {
  tiposDeConta = Object.values(TipoConta);

  novaConta: Conta = {
    nome: '',
    saldo: 0,
    tipo: TipoConta.CONTA_CORRENTE,
  };

  constructor(public dialogRef: MatDialogRef<ContaDialogComponent>) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.novaConta);
  }
}
