export interface IHistorico {
  data: string,
  hora: string,
  valor: number,
  moedaOrigem: string,
  resultado: number,
  moedaDestino: string,
  rate: number[],
  dolarValorMaior: boolean
}
