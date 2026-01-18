export interface Conta {
  id?: string;
  nome: string;
  saldo: number;
  tipo: TipoConta;
}

export enum TipoConta {
  CONTA_CORRENTE = 'CONTA_CORRENTE',
  ESPECIE = 'ESPECIE',
  CREDITO = 'CREDITO',
}

export const TipoContaLabel: Record<TipoConta, string> = {
  [TipoConta.CONTA_CORRENTE]: 'Conta Corrente',
  [TipoConta.ESPECIE]: 'Espécie',
  [TipoConta.CREDITO]: 'Crédito',
};
