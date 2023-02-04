import { IHistorico } from './../interface/IHistorico';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor() { }

  carregarLocalStorage(): IHistorico[] {
    let local: any = localStorage.getItem('conversions');
    let conversions: IHistorico[] = JSON.parse(local) || [];
    return conversions;
  }
}
