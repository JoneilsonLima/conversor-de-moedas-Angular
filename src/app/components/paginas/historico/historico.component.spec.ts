import { IHistorico } from './../../../interface/IHistorico';
import { async } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoComponent } from './historico.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { DataSource } from '@angular/cdk/collections';

import { MatTableModule } from '@angular/material/table';



describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoComponent ],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatTableModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('must have a table', () => {
    let table = fixture.nativeElement.querySelectorAll('main table')
    expect(table).toBeTruthy();
  });

  it(`must call the method ${HistoricoComponent.prototype.deletarHistorico.name} when clicked`, () => {
    let historico: IHistorico = {
      date: "10/02/2023",
      time: "17:09:19",
      inputValue: 231,
      inputCurrency: "ARS",
      outputValue: 2.189812,
      outputCurrency: "AWG",
      rate: [0.00948],
      dolarValue: false
    }
    component.dataSource.data.push(historico)
    fixture.detectChanges()
    spyOn(component, 'deletarHistorico')
    let button: HTMLElement = fixture.nativeElement.querySelector('#btn-delete')
    button.click()
    expect(component.deletarHistorico).toHaveBeenCalledTimes(1)
  });
});
