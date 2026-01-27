import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conta } from '../../../../core/models/conta.model';

@Component({
  selector: 'app-conta-dialog',
  standalone: false,
  templateUrl: './conta-dialog.component.html',
  styleUrl: './conta-dialog.component.scss',
})
export class ContaDialogComponent {
  isEdicao = false;

  novaConta: any = {
    nome: '',
    saldo: null,
    tipo: null,
  };

  constructor(
    public dialogRef: MatDialogRef<ContaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conta,
  ) {
    if (data) {
      this.isEdicao = true;

      this.novaConta = { ...data };
    }
  }

  ngOnInit(): void {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    const contaParaSalvar = {
      nome: this.novaConta.nome,
      saldo: this.novaConta.saldo,

      tipoId: this.novaConta.tipo?.id,
    };

    this.dialogRef.close(contaParaSalvar);
  }
}
