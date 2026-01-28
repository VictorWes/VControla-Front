import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContaService } from '../../../../core/services/conta.service';
import { Conta } from '../../../../core/models/conta.model';

@Component({
  selector: 'app-selecao-conta-dialog',
  standalone: false,
  templateUrl: './selecao-conta-dialog.component.html',
  styleUrl: './selecao-conta-dialog.component.scss',
})
export class SelecaoContaDialogComponent implements OnInit {
  contas: Conta[] = [];
  contaSelecionadaId: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<SelecaoContaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contaService: ContaService,
  ) {}

  ngOnInit(): void {
    this.contaService.listar().subscribe((contas) => {
      this.contas = contas;

      if (this.contas.length > 0) {
        this.contaSelecionadaId = this.contas[0].id;
      }
    });
  }

  confirmar() {
    this.dialogRef.close(this.contaSelecionadaId);
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
