import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transacao-cadastro',
  standalone: false,
  templateUrl: './transacao-cadastro.component.html',
  styleUrl: './transacao-cadastro.component.scss',
})
export class TransacaoCadastroComponent implements OnInit {
  novaTransacao: any = {
    tipo: '',
    valor: null,
    descricao: '',
    contaId: '',
    data: new Date(),
  };

  todasContas: any[] = [];
  carteirasUnicas: any[] = [];
  contasFiltradas: any[] = [];

  carteiraSelecionadaId: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<TransacaoCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.novaTransacao.tipo = data.tipo;
    this.todasContas = data.contas || [];
  }
  ngOnInit(): void {
    this.extrairCarteirasUnicas();

    if (this.data.contaSelecionada) {
      this.preencherDadosIniciais(this.data.contaSelecionada);
    }
  }

  salvar(): void {
    this.dialogRef.close(this.novaTransacao);
  }

  extrairCarteirasUnicas() {
    const map = new Map();

    this.todasContas.forEach((conta) => {
      if (conta.tipo) {
        // Usa o ID do tipo como chave para não duplicar
        if (!map.has(conta.tipo.id)) {
          map.set(conta.tipo.id, conta.tipo);
        }
      }
    });

    this.carteirasUnicas = Array.from(map.values());
  }

  aoSelecionarCarteira(tipoId: string) {
    this.carteiraSelecionadaId = tipoId;
    this.novaTransacao.contaId = '';

    this.contasFiltradas = this.todasContas.filter(
      (c) => c.tipo?.id === tipoId,
    );

    if (this.contasFiltradas.length === 1) {
      this.novaTransacao.contaId = this.contasFiltradas[0].id;
    }
  }

  preencherDadosIniciais(conta: any) {
    if (conta.tipo) {
      this.carteiraSelecionadaId = conta.tipo.id;
      this.aoSelecionarCarteira(conta.tipo.id);
      this.novaTransacao.contaId = conta.id;
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
