import { IHistorico } from './../../../interface/IHistorico';
import { HistoricoService } from './../../../services/historico.service';
import { IMoedas } from './../../../interface/IMoeda';
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
  moedas!: IMoedas[];
  form!: FormGroup;
  moedaOrigem!: string;
  moedaDestino!: string;
  valor!: number;
  taxa!: any;
  resultado: any;

  conversions: IHistorico[] = [];
  date!: string;
  time!: string;
  maiorValorEmDolar!: boolean;

  local: any = localStorage.getItem('historico');

  constructor(private moeda: MoedasService, private historicoService: HistoricoService) {
    this.form = new FormGroup({
      moedaOrigem: new FormControl(''),
      moedaDestino: new FormControl(''),
      valor: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.historicoService.carregarLocalStorage()
    this.moeda.getSymbols().subscribe((data: ISimbolo) => {
      let resultado = Object.keys(data.symbols).map(function (moeda: any) {
        let resul = data.symbols[moeda];
        return resul;
      });
      this.moedas = resultado;
    });
  }

  converterMoeda(): void {
    if (this.valor >= 0) {
      this.moeda
        .converterMoeda(this.moedaOrigem, this.moedaDestino, this.valor)
        .subscribe((data: any) => {
          this.resultado = data['result'];
          this.taxa = Object.values(data['info']);
          this.valorSuperiorDolar();
        });
    }
  }

  valorSuperiorDolar(): void {
    this.moeda
      .converterMoeda(this.moedaDestino, 'USD', this.resultado)
      .subscribe((data: any) => {
        this.maiorValorEmDolar = data['result'];
        this.salvarLocalStorage();
      });
  }

  salvarLocalStorage(): void {
    let date = new Date();

    this.date = date.toLocaleDateString();
    this.time = date.toLocaleTimeString();

    let conversion: IHistorico = {
      date: this.date,
      time: this.time,
      inputValue: this.valor,
      inputCurrency: this.moedaOrigem,
      outputValue: this.resultado,
      outputCurrency: this.moedaDestino,
      rate: this.taxa,
      dolarValue: this.maiorValorEmDolar,
    };

    this.conversions = JSON.parse(this.local) || [];
    this.conversions.push(conversion);
    localStorage.setItem('historico', JSON.stringify(this.conversions));
    this.historicoService.carregarLocalStorage()
  }
}
