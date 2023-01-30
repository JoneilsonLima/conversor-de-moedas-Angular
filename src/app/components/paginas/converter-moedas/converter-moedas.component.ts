import { ISimbolo } from './../../../interface/ISimbolo';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MoedasService } from 'src/app/services/moedas.service';

@Component({
  selector: 'app-converter-moedas',
  templateUrl: './converter-moedas.component.html',
  styleUrls: ['./converter-moedas.component.css'],
})
export class ConverterMoedasComponent implements OnInit {
  moedas: any[] = [];
  form!: FormGroup;
  moedaOrigem!: string;
  moedaDestino!: string;
  valor!: number;
  resultado: any;

  constructor(private moeda: MoedasService) {
    this.form = new FormGroup({
      moedaOrigem: new FormControl(''),
      moedaDestino: new FormControl(''),
      valor: new FormControl('')
    });
  }

  ngOnInit() {
    this.moeda.getSymbols().subscribe((data: ISimbolo) => {
      var resultado = Object.keys(data.symbols).map(function (moeda: any) {
        let resul = data.symbols[moeda];
        return resul;
      });
      this.moedas = resultado;
    });
  }

  converter() {
    if(this.valor >= 0) {
      this.moeda
      .converterMoeda(this.moedaOrigem, this.moedaDestino, this.valor)
      .subscribe((data: any) => {
        this.resultado = data['result'];
      });
    }
  }
}
