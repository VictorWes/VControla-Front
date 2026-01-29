import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Conta } from '../../../../core/models/conta.model';
import { Transacao } from '../../../../core/models/transacao.model';
import { ContaService } from '../../../../core/services/conta.service';
import { TransacaoService } from '../../../../core/services/transacao.service';
import { TransacaoCadastroComponent } from '../../components/transacao-cadastro/transacao-cadastro.component';

@Component({
  selector: 'app-transacao-lista',
  standalone: false,
  templateUrl: './transacao-lista.component.html',
  styleUrl: './transacao-lista.component.scss',
})
export class TransacaoListaComponent implements OnInit {
  // Variáveis de Controle
  listaContas: Conta[] = [];
  contaSelecionada: Conta | null = null;
  termoBusca: string = '';

  // Variáveis de Dados
  listaTransacoes: Transacao[] = [];
  transacoesFiltradas: Transacao[] = [];
  transacoesPaginadas: Transacao[] = [];

  // Configuração da Paginação
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tamanhoPagina = 10;
  paginaAtual = 0;

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
    this.transacoesFiltradas = this.listaTransacoes.filter((item) => {
      const matchConta = this.contaSelecionada
        ? item.contaId === this.contaSelecionada.id
        : true;

      const termo = this.termoBusca.toLowerCase().trim();
      const matchBusca =
        item.descricao.toLowerCase().includes(termo) ||
        (item.contaNome && item.contaNome.toLowerCase().includes(termo)) ||
        item.valor.toString().includes(termo);

      return matchConta && matchBusca;
    });

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.atualizarPagina();
  }

  atualizarPagina(event?: PageEvent) {
    if (event) {
      this.paginaAtual = event.pageIndex;
      this.tamanhoPagina = event.pageSize;
    } else {
      this.paginaAtual = 0;
      this.tamanhoPagina = this.tamanhoPagina || 10;
    }

    const inicio = this.paginaAtual * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;

    this.transacoesPaginadas = this.transacoesFiltradas.slice(inicio, fim);
  }

  // REMOVIDO: Método abrirNovaTransacao() foi apagado pois não há botões para chamá-lo

  criarTransacao(transacao: any) {
    const payload: any = {
      descricao: transacao.descricao,
      valor: transacao.valor,
      data: transacao.data,
      contaId: transacao.contaId,
      tipo: transacao.tipo,
      status: 'PAGO',
    };

    this.transacaoService.criar(payload).subscribe({
      next: () => {
        this.contaSelecionada = null;
        this.carregarContas();
        this.carregarTransacoes();
      },
      error: (err) => console.error(err),
    });
  }

  excluirTransacao(item: any) {
    if (confirm(`Tem certeza que deseja excluir "${item.descricao}"?`)) {
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
        this.contaSelecionada = null;
        this.carregarContas();
        this.carregarTransacoes();
      },
      error: (err) => alert('Erro ao atualizar'),
    });
  }
}
