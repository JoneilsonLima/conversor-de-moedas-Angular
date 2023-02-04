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

  conversions: any[] = [];
  date!: string;
  time!: string;
  maiorValorEmDolar!: number;

  local: any = localStorage.getItem('conversions');

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

  converterMoeda() {
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

  valorSuperiorDolar() {
    this.moeda
      .converterMoeda(this.moedaDestino, 'USD', this.resultado)
      .subscribe((data: any) => {
        this.maiorValorEmDolar = data['result'];
        this.salvarLocalStorage();
      });
  }

  salvarLocalStorage() {
    let date = new Date();
    let converterData: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    let converterHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    this.date = date.toLocaleDateString('pt-BR', converterData);
    this.time = date.toLocaleTimeString('pt-BR', converterHora);

    let conversion = {
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
    localStorage.setItem('conversions', JSON.stringify(this.conversions));
    this.historicoService.carregarLocalStorage()
  }
}
