export type StatusPlanejamento = 'PENDENTE' | 'GUARDADO';

export interface ItemPlanejamento {
  id: string;
  nomeCarteira: string;
  carteiraId: string;
  valor: number;
  status: StatusPlanejamento;
  contaDestinoId: string;
  nomeContaDestino: string;
}

export interface ResumoFinanceiro {
  saldoDisponivelVirtual: number;
  itens: ItemPlanejamento[];
}

export interface ItemPlanejamentoRequest {
  carteiraId: string;
  valor: number;
  contaDestinoId: string;
}
