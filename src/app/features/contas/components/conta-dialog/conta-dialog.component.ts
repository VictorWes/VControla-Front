import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conta } from '../../../../core/models/conta.model';
import { TipoContaService } from '../../../../core/services/tipo-conta.service';
import { TipoConta } from '../../../../core/models/tipo-conta.model';

@Component({
  selector: 'app-conta-dialog',
  standalone: false,
  templateUrl: './conta-dialog.component.html',
  styleUrl: './conta-dialog.component.scss',
})
export class ContaDialogComponent {
  tiposDeConta: TipoConta[] = [];
  isEdicao = false;

  novaConta: any = {
    nome: '',
    saldo: null,
    tipo: null,
  };

  constructor(
    public dialogRef: MatDialogRef<ContaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conta,
    private tipoContaService: TipoContaService,
  ) {
    if (data) {
      this.isEdicao = true;
      this.novaConta = { ...data };
    }
  }

  ngOnInit(): void {
    this.tipoContaService.listar().subscribe({
      next: (lista) => {
        this.tiposDeConta = lista;

        if (!this.isEdicao && lista.length > 0) {
          this.novaConta.tipo = lista[0];
        }
      },
      error: (err) => console.error('Erro ao buscar tipos', err),
    });
  }

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

  compararTipos(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
