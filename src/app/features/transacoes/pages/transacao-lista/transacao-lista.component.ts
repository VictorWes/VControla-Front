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
  contaSelecionada: Conta | null = null;
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
    });
  }

  carregarTransacoes() {
    this.transacaoService.listar().subscribe((transacoes) => {
      this.listaTransacoes = transacoes;
      this.filtrarTransacoes();
    });
  }
  filtrarTransacoes() {
    this.transacoesFiltradas = this.listaTransacoes
      .filter((item) => {
        const matchConta = this.contaSelecionada
          ? item.contaId === this.contaSelecionada.id
          : true;

        const termo = this.termoBusca.toLowerCase().trim();
        const matchBusca =
          item.descricao.toLowerCase().includes(termo) ||
          (item.contaNome && item.contaNome.toLowerCase().includes(termo)) ||
          item.valor.toString().includes(termo);

        return matchConta && matchBusca;
      })
      .sort((a, b) => {
        const dataA = new Date(a.data).getTime();
        const dataB = new Date(b.data).getTime();

        if (dataA !== dataB) {
          return dataB - dataA;
        }

        if (a.id && b.id) {
          return b.id.localeCompare(a.id);
        }

        return 0;
      });
  }

  abrirNovaTransacao(tipo: 'GASTOS' | 'RECEITAS') {
    const dialogRef = this.dialog.open(TransacaoCadastroComponent, {
      width: '400px',
      data: {
        tipo: tipo,
        contas: this.listaContas,
        contaSelecionada: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.criarTransacao(result);
      }
    });
  }

  criarTransacao(transacao: any) {
    const payload: Transacao = {
      descricao: transacao.descricao,
      valor: transacao.valor,
      data: transacao.data,
      contaId: transacao.contaId,
      tipo: transacao.tipo,
      status: 'PAGO',
    };

    this.transacaoService.criar(payload).subscribe({
      next: () => {
        console.log('Transação criada com sucesso');

        const contaDaTransacao = this.listaContas.find(
          (c) => c.id === transacao.contaId,
        );
        if (contaDaTransacao) {
          this.contaSelecionada = contaDaTransacao;
        }

        this.carregarContas();
        this.carregarTransacoes();
      },
      error: (err) => {
        console.error('Erro ao criar transação:', err);
      },
    });
  }

  excluirTransacao(item: any) {
    if (
      confirm(
        `Tem certeza que deseja excluir "${item.descricao}"? O saldo será revertido.`,
      )
    ) {
      this.transacaoService.excluir(item.id).subscribe({
        next: () => {
          this.carregarContas();
          this.carregarTransacoes();
        },
        error: (err) => alert('Erro ao excluir'),
      });
    }
  }

  editarTransacao(item: any) {
    const dialogRef = this.dialog.open(TransacaoCadastroComponent, {
      width: '400px',
      data: {
        tipo: item.tipo, 
        contas: this.listaContas,


        transacaoParaEditar: item,

        contaSelecionada: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        if (item.id) {
          this.atualizarTransacao(item.id, result);
        } else {
          this.criarTransacao(result);
        }
      }
    });
  }

  atualizarTransacao(id: string, transacao: any) {
    const payload = {
      descricao: transacao.descricao,
      valor: transacao.valor,
      data: transacao.data,
      contaId: transacao.contaId,
      tipo: transacao.tipo,
      status: 'PAGO',
    };

    this.transacaoService.atualizar(id, payload).subscribe({
      next: () => {
        this.contaSelecionada = null; // Reseta filtro
        this.carregarContas();
        this.carregarTransacoes();
      },
      error: (err) => alert('Erro ao atualizar'),
    });
  }
}
