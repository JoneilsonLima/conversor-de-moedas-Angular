import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMoedas } from 'src/app/interface/IMoeda';
import { ISimbolo } from 'src/app/interface/ISimbolo';
import { MoedasService } from 'src/app/services/moedas.service';


@Component({
  selector: 'app-tabela-moedas',
  templateUrl: './tabela-moedas.component.html',
  styleUrls: ['./tabela-moedas.component.css']
})
export class TabelaMoedasComponent implements AfterViewInit {
  displayedColumns: string[] = ['code', 'description'];
  dataSource!: MatTableDataSource<IMoedas>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaDeMoedas: IMoedas[] = [];

  constructor(public moedas: MoedasService) {}

  ngOnInit() {
    this.getSimbolos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getSimbolos(){
    this.moedas.getSymbols().subscribe((data:ISimbolo) => {
      var retorno =  Object.keys(data.symbols).map(function(moeda: any){
        let resultado = data.symbols[moeda]
        return resultado;
      })
      this.listaDeMoedas = retorno;
      this.dataSource = new MatTableDataSource(this.listaDeMoedas);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
