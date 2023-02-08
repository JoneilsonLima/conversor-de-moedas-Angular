import { ISimbolo } from 'src/app/interface/ISimbolo';
import { MoedasService } from 'src/app/services/moedas.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IMoedas } from 'src/app/interface/IMoeda';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabela-moedas',
  templateUrl: './tabela-moedas.component.html',
  styleUrls: ['./tabela-moedas.component.css'],
})
export class TabelaMoedasComponent implements AfterViewInit {
  error: any;
  displayedColumns: string[] = ['code', 'description'];
  dataSource: MatTableDataSource<IMoedas>;
  listaDeMoedas: IMoedas[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public moedas: MoedasService) {
    this.dataSource = new MatTableDataSource(this.listaDeMoedas);
  }

  ngOnInit(): void {
    this.getSimbolos();
    (error: any) => {
      this.error = error;
      console.error('ERROR: ', error);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getSimbolos(): void {
    this.moedas.getSymbols().subscribe((data: ISimbolo) => {
      var retorno = Object.keys(data.symbols).map(function (moeda: any) {
        let resultado = data.symbols[moeda];
        return resultado;
      });
      this.listaDeMoedas = retorno;
      this.dataSource = new MatTableDataSource(this.listaDeMoedas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
