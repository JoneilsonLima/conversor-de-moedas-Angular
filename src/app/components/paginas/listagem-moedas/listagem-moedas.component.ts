import { MoedasService } from './../../../services/moedas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagem-moedas',
  templateUrl: './listagem-moedas.component.html',
  styleUrls: ['./listagem-moedas.component.css']
})

export class ListagemMoedasComponent implements OnInit{
  error: any;
  listaMoedas: any[] = []

  constructor(private moeda: MoedasService) {}

  ngOnInit(): void {
    this.moeda.getSymbols().subscribe((listaMoedas) => {
      this.listaMoedas = Object.values(listaMoedas)
      console.log(listaMoedas)
    }), (error: any)=> {
      this.error = error;
      console.error("ERROR: ", error)
    }
  }
}
