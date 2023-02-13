import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { MoedasService } from 'src/app/services/moedas.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ConverterMoedasComponent } from './converter-moedas.component';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { async } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('ConverterMoedasComponent', () => {
  let component: ConverterMoedasComponent;
  let fixture: ComponentFixture<ConverterMoedasComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterMoedasComponent ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSnackBarModule,
        HttpClientModule,
        MatSelectModule,
        FormsModule,
        MatInputModule
      ],
      providers:[MoedasService, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverterMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must load two coin selectors', () => {
    let selects = fixture.nativeElement.querySelectorAll('mat-form-field mat-select')
    expect(selects.length).toBe(2);
  });

  it('must load value input', () => {
    let input: DebugElement = fixture.debugElement.query(By.css('#input-value'))
    expect(input).toBeTruthy()
  });

  it('must define the value to be converted', () => {
    let input = fixture.nativeElement.querySelector('#input-value')
    expect(input.value).toBe('');
    input.value = '10';
    expect(input.value).toBe('10');
  });

  it('Must disable converter button when value is less than 0', () => {
    component.moedaOrigem = 'USA';
    component.moedaDestino = 'EUR';
    component.valor = 0;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('#botao'));
    expect(button.nativeElement.disabled).toBeTruthy();
  });

  it('should display a warning if the value is less than or equal to 0', () => {
    component.moedaOrigem = 'USA';
    component.moedaDestino = 'EUR';
    component.valor = -1;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#erro')).nativeElement
    expect(el.classList.contains('aviso')).toEqual(true)
  });

  it(`must call function ${ConverterMoedasComponent.prototype.converterMoeda.name} when clicked`, () => {
    fixture.detectChanges()
    spyOn(component, 'converterMoeda')
    el = fixture.debugElement.query(By.css('button')).nativeElement
    el.click()
    expect(component.converterMoeda).toHaveBeenCalledTimes(1)
  })
});
