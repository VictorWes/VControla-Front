import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-diminuir-saldo',
  standalone: false,
  templateUrl: './modal-diminuir-saldo.component.html',
  styleUrl: './modal-diminuir-saldo.component.scss',
})
export class ModalDiminuirSaldoComponent {
  valor: number | null = null;

  constructor(public dialogRef: MatDialogRef<ModalDiminuirSaldoComponent>) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.valor);
  }
}
