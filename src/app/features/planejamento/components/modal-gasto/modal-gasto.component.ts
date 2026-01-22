import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemPlanejamentoRequest } from '../../../../core/models/financeiro.model';

@Component({
  selector: 'app-modal-gasto',
  standalone: false,
  templateUrl: './modal-gasto.component.html',
  styleUrl: './modal-gasto.component.scss',
})
export class ModalGastoComponent {
  novoItem: ItemPlanejamentoRequest = {
    carteiraId: '',
    valor: 0,
    contaDestinoId: '',
  };

  listaCarteiras: any[] = [];
  listaContas: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.listaCarteiras = data.carteiras || [];
    this.listaContas = data.contas || [];
  }

  salvar() {
    this.dialogRef.close(this.novoItem);
  }
}
