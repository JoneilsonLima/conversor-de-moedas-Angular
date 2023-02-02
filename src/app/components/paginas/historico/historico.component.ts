import { IHistorico } from './../../../interface/IHistorico';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogOverviewExampleDialog } from './modal-dialog/DialogOverviewExampleDialog';
import { SnackBarComponent } from './snack-bar/snack-bar.component';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
  providers: [MatDialogModule, MatSnackBar]
})
export class HistoricoComponent implements OnInit{

  local: any = localStorage.getItem('conversions');

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  displayedColumns: string[] = [
    'date',
    'time',
    'inputValue',
    'inputCurrency',
    'outputValue',
    'outputCurrency',
    'rate',
    'delete',
  ];

  dataSource = new MatTableDataSource<IHistorico>();
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = JSON.parse(this.local);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  deletarHistorico(element: any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.indexOf(element);
        this.dataSource.data.splice(index, 1);
        localStorage.setItem('conversions', JSON.stringify(this.dataSource.data));
        this.dataSource.data = JSON.parse(this.local);
        this.openSnackBar()
        setTimeout(() => {
          window.location.reload();
      }, 2000);
      }
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
