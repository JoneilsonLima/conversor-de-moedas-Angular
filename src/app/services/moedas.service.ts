import { environment } from './../../environments/environments';
import { ISimbolo } from './../interface/ISimbolo';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MoedasService {

  constructor(private http: HttpClient) {}

  getSymbols(): Observable<ISimbolo> {
    return this.http.get<ISimbolo>(`${environment.API_URL}/symbols`);
  }

  converterMoeda(moedaOrigem: string, moedaDestino: string, valor: number) {
    const url = `${environment.API_URL}/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`;
    return this.http.get(url);
  }
}
