export interface CartaoCredito {
  id?: string;
  nome: string;
  limiteTotal: number;
  limiteDisponivel: number;
  diaVencimento: number;
  diaFechamento: number;
  valorFaturaAtual?: number;
  usuarioId?: string;
}
