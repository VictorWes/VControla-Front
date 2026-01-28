export interface Compra {
  id: string;
  nome: string;
  valorTotal: number;
  qtdeParcelas: number;
  valorParcela: number;
  dataCompra: string;
  isQuitada: boolean;
  parcelas?: any[];
}
