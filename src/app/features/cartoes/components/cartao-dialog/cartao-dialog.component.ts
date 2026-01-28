import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartaoCredito } from '../../../../core/models/cartao-credito.model';

@Component({
  selector: 'app-cartao-dialog',
  standalone: false,
  templateUrl: './cartao-dialog.component.html',
  styleUrls: ['./cartao-dialog.component.scss'],
})
export class CartaoDialogComponent {
  form: FormGroup;
  isEdicao = false;

  diasDoMes: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CartaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartaoCredito,
  ) {
    this.isEdicao = !!data;

    this.form = this.fb.group({
      nome: [data?.nome || '', Validators.required],
      limite: [
        data?.limiteTotal || null,
        [Validators.required, Validators.min(1)],
      ],
      diaVencimento: [data?.diaVencimento || null, Validators.required],
      diaFechamento: [data?.diaFechamento || null, Validators.required],
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
