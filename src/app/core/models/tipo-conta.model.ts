export type ComportamentoConta = 'CONTA_CORRENTE' | 'ESPECIE' | 'CREDITO';

export interface TipoConta {
  id: string;
  nome: string;
  icone: string;
  cor?: string;
  comportamento: ComportamentoConta;
}
