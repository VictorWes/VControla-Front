export interface CartaoCredito {
  id?: string;
  nome: string;
  limite: number;
  diaVencimento: number;
  diaFechamento: number;
  valorFaturaAtual: number; 
}
