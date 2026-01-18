export interface Transacao {
  id?: string;
  descricao: string;
  valor: number;
  tipo: 'GASTOS' | 'RECEITAS';
  status: 'PENDENTE' | 'PAGOO' | 'CANCELADO';
  data: string;
  contaId: string;
  contaNome?: string;

  numeroParcela?: string;
}
