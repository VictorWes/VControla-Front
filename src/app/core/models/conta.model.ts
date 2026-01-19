import { TipoConta } from "./tipo-conta.model";

export interface Conta {
  id?: string;
  nome: string;
  saldo: number;

  tipo?: TipoConta;

  tipoId?: string;
}
