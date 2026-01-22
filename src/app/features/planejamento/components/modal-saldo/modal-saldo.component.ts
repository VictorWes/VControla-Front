import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-saldo',
  standalone: false,
  templateUrl: './modal-saldo.component.html',
  styleUrl: './modal-saldo.component.scss'
})
export class ModalSaldoComponent {

  valor: number | null = null;

  constructor(public dialogRef: MatDialogRef<ModalSaldoComponent>) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.valor);
  }

}
