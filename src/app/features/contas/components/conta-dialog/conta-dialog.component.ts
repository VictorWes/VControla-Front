import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conta, TipoConta } from '../../../../core/models/conta.model';

@Component({
  selector: 'app-conta-dialog',
  standalone: false,
  templateUrl: './conta-dialog.component.html',
  styleUrl: './conta-dialog.component.scss',
})
export class ContaDialogComponent {
  tiposDeConta = Object.values(TipoConta);
  isEdicao = false;

  novaConta: any = {
    nome: '',
    saldo: null,
    tipo: TipoConta.CONTA_CORRENTE,
  };

  constructor(public dialogRef: MatDialogRef<ContaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conta
  ) {
    if (data) {
      this.isEdicao = true;
      this.novaConta = { ...data };
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.novaConta);
  }
}
