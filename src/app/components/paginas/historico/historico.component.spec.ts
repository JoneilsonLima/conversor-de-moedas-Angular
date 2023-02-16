import { IHistorico } from './../../../interface/IHistorico';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricoComponent } from './historico.component';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';


describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;
  let mockHistorico: IHistorico = {
    date: "10/02/2023",
    time: "17:09:19",
    inputValue: 231,
    inputCurrency: "ARS",
    outputValue: 2.189812,
    outputCurrency: "AWG",
    rate: [0.00948],
    dolarValue: 232
  }
  let mockMaiorValorIcone = {
    date: "10/02/2023",
    time: "17:09:19",
    inputValue: 12000,
    inputCurrency: "USD",
    outputValue: 11201.060376,
    outputCurrency: "EUR",
    rate: [0.933422],
    dolarValue: 12000
  }
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
    component.dataSource.data.push(mockHistorico)
    fixture.detectChanges()
    spyOn(component, 'deletarHistorico')
    let button: HTMLElement = fixture.nativeElement.querySelector('#btn-delete')
    button.click()
    expect(component.deletarHistorico).toHaveBeenCalledTimes(1)
  });

  it('should open the modal by clicking on the trash can icon', () => {
    component.dataSource.data.push(mockHistorico)
    fixture.detectChanges()

    let dialogOpen = document.querySelectorAll('app-confirm-dialog h1')[0];
    expect(dialogOpen).toBeUndefined()

    let btn: HTMLButtonElement = fixture.nativeElement.querySelector('#btn-delete')
    btn.click()
    fixture.detectChanges()

    dialogOpen = document.querySelectorAll('app-confirm-dialog h1')[0];
    expect(dialogOpen.innerHTML).toEqual('Excluir Histórico')
  });

  it ('must delete history with value passed as argument', () => {
    spyOn(component, 'deletarHistorico').and.callThrough();
    component.deletarHistorico(1);
    expect(component.deletarHistorico).toHaveBeenCalled();
    expect(component.deletarHistorico).toHaveBeenCalledWith(1);
  });

  it('It should show a message when the history is empty', () => {
    component.dataSource.data = [];
    fixture.detectChanges();
    let historicoVazio: HTMLElement = fixture.nativeElement.querySelector('.historico-vazio');
    expect(historicoVazio.textContent).toContain('Histórico de conversões está vazio.');
  });

  it('It should display an icon indicating that the value is greater than 10 thousand dollars', ()=> {
    component.dataSource.data.push(mockMaiorValorIcone)
    fixture.detectChanges()
    let iconeValor: HTMLElement = fixture.nativeElement.querySelector('#maior-valor');
    expect(iconeValor).toBeTruthy()
  })

  it('Must not display an icon if the amount is less than 10 thousand dollars', ()=> {
    component.dataSource.data.push(mockHistorico)
    fixture.detectChanges()
    let iconeValor: HTMLElement = fixture.nativeElement.querySelector('#maior-valor');
    expect(iconeValor).toBeFalsy()
  })
});
