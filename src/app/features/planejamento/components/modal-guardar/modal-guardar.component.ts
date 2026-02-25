import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-guardar',
  standalone: false,
  templateUrl: './modal-guardar.component.html',
  styleUrl: './modal-guardar.component.scss',
})
export class ModalGuardarComponent {
  valor: number | null = null;

  constructor(public dialogRef: MatDialogRef<ModalGuardarComponent>) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.valor);
  }
}
