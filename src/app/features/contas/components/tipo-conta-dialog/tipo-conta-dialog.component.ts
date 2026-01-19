import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-conta-dialog',
  templateUrl: './tipo-conta-dialog.component.html',
  styleUrls: ['./tipo-conta-dialog.component.scss'],
  standalone: false,
})
export class TipoContaDialogComponent {
  nomeCarteira: string = '';

  constructor(public dialogRef: MatDialogRef<TipoContaDialogComponent>) {}

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.nomeCarteira);
  }
}
