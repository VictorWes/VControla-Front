import { Component, OnInit } from '@angular/core';
import { Conta } from '../../../../core/models/conta.model';
import { Transacao } from '../../../../core/models/transacao.model';
import { ContaService } from '../../../../core/services/conta.service';
import { TransacaoService } from '../../../../core/services/transacao.service';

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

  filtroConta: string | null = null;
  termoBusca: string = '';

  constructor(
    private contaService: ContaService,
    private transacaoService: TransacaoService,
  ) {}

  ngOnInit(): void {
    this.carregarContas();
    this.carregarTransacoes();
  }

  carregarContas() {
    this.contaService.listar().subscribe({
      next: (dados) => (this.listaContas = dados),
      error: (err) => console.error('Erro ao buscar contas', err),
    });
  }

  carregarTransacoes() {
    this.transacaoService.listar().subscribe({
      next: (dados) => {
        this.listaTransacoes = dados;
        this.filtrarTransacoes(); // Aplica filtros assim que carregar
      },
      error: (err) => console.error('Erro ao buscar transações', err),
    });
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
}
