export interface Currency {
  fullName: string;
  acronym: string;
}

export interface CurrencyExchange {
  currencyFrom: string;
  valueFrom: number;
  currencyTo: string;
  valueTo: number;
  rate: number;
  date: string;
}
