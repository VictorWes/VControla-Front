import { Component, OnInit } from '@angular/core';
import { Conta } from '../../../../core/models/conta.model';
import { Transacao } from '../../../../core/models/transacao.model';
import { ContaService } from '../../../../core/services/conta.service';
import { TransacaoService } from '../../../../core/services/transacao.service';
import { MatDialog } from '@angular/material/dialog';
import { TransacaoCadastroComponent } from '../../components/transacao-cadastro/transacao-cadastro.component';

@Component({
  selector: 'app-transacao-lista',
  standalone: false,
  templateUrl: './transacao-lista.component.html',
  styleUrl: './transacao-lista.component.scss',
})
export class TransacaoListaComponent implements OnInit {
  listaContas: Conta[] = [];
  listaTransacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  contaSelecionada: any = null;

  filtroConta: string | null = null;
  termoBusca: string = '';

  constructor(
    private contaService: ContaService,
    private transacaoService: TransacaoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.carregarContas();
    this.carregarTransacoes();
  }

  carregarContas() {
    this.contaService.listar().subscribe((contas) => {
      this.listaContas = contas;
      if (this.listaContas.length > 0) {
        this.contaSelecionada = this.listaContas[0];
        this.carregarTransacoes();
      }
    });
  }

  carregarTransacoes() {
    if (!this.contaSelecionada) return;
    console.log('Carregando transações da conta:', this.contaSelecionada.nome);
  }
  filtrarTransacoes() {
    this.transacoesFiltradas = this.listaTransacoes.filter((item) => {
      const matchConta = this.filtroConta
        ? item.contaId === this.filtroConta
        : true;

      const termo = this.termoBusca.toLowerCase().trim();
      const matchBusca =
        item.descricao.toLowerCase().includes(termo) ||
        (item.contaNome && item.contaNome.toLowerCase().includes(termo)) ||
        item.valor.toString().includes(termo);

      return matchConta && matchBusca;
    });
  }

  abrirNovaTransacao(tipo: 'GASTOS' | 'RECEITAS') {
    const dialogRef = this.dialog.open(TransacaoCadastroComponent, {
      width: '400px',
      data: {
        tipo: tipo,
        contas: this.listaContas,
        contaSelecionada: this.contaSelecionada,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.criarTransacao(result);
      }
    });
  }

  criarTransacao(transacao: any) {
    this.transacaoService.criar(transacao).subscribe({
      next: () => {
        console.log('Transação criada com sucesso!');
        this.carregarTransacoes(); // Atualiza a lista na hora!
      },
      error: (err) => console.error('Erro ao criar transação', err),
    });
  }
}
