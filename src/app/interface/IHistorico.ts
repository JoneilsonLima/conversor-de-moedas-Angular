export interface IHistorico {
  date: string,
  time: string,
  inputValue: number,
  inputCurrency: string,
  outputValue: number,
  outputCurrency: string,
  rate: number[],
  dolarValue: boolean
}
