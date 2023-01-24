import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MoedasService {

  private readonly API = 'https://api.exchangerate.host';
  constructor(private http: HttpClient) { }

  getSymbols(): Observable<any> {
    return this.http
      .get<any>(`${this.API}/symbols`)
      .pipe(map((data) => data.symbols));
  }
}


