import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-resgatar',
  standalone: false,
  templateUrl: './modal-resgatar.component.html',
  styleUrl: './modal-resgatar.component.scss',
})
export class ModalResgatarComponent {
  valor: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<ModalResgatarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { descricao: string; saldoAtual: number },
  ) {}

  cancelar(): void {
    this.dialogRef.close();
  }
  confirmar(): void {
    this.dialogRef.close(this.valor);
  }
}
