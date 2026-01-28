import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compra-dialog',
  templateUrl: './compra-dialog.component.html',
  styleUrls: ['./compra-dialog.component.scss'],
  standalone: false,
})
export class CompraDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cartaoId: string },
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      valorTotal: [null, [Validators.required, Validators.min(0.01)]],
      qtdeParcelas: [
        1,
        [Validators.required, Validators.min(1), Validators.max(48)],
      ],
      dataCompra: [new Date(), Validators.required],
      cartaoId: [data.cartaoId, Validators.required],
    });
  }

  ngOnInit(): void {}

  salvar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
