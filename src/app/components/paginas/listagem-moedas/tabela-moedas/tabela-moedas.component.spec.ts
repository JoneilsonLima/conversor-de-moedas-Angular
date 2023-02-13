import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaMoedasComponent } from './tabela-moedas.component';
import { MoedasService } from 'src/app/services/moedas.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('TabelaMoedasComponent', () => {
  let component: TabelaMoedasComponent;
  let fixture: ComponentFixture<TabelaMoedasComponent>;
  let service: MoedasService;
  let moeda: MoedasService;
  let symbolMock: any;
  let symbols = {
    "AED": { "description": 'United Arab Emirates Dirham', code: 'AED' },
    "AFN": { "description": 'Afghan Afghani', "code": 'AFN' },
    "ALL": { "description": "Albanian Lek", "code": "ALL" },
    "AMD": { "description": "Armenian Dram", "code": "AMD" },
  };
  let mockApiService = {
    motd: { msg: 'msg', url: 'url' },
    success: true,
    symbols: Object.values(symbols),
  };

  beforeEach(async () => {
    symbolMock = jasmine.createSpyObj(['getSymbols']);
    let list$ = jasmine.createSpy().and.returnValue(mockApiService);
    symbolMock.getSymbols.and.returnValue(of(list$));
    await TestBed.configureTestingModule({
      declarations: [TabelaMoedasComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
      ],
      providers: [
        TabelaMoedasComponent,
        HttpClient,
        HttpHandler,
        { provide: MoedasService, useValue: symbolMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaMoedasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MoedasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must initialize the dataSource', () => {
    expect(component.dataSource).toBeTruthy();
  });

  it('Must display a table', () => {
    let table: DebugElement = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('must contain an input field', () => {
    let table: DebugElement = fixture.debugElement.query(By.css('input'));
    expect(table).toBeTruthy();
  });

  it('Must get input value from input', () => {
    let input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');
    input.value = 'BRL';
    expect(input.value).toBe('BRL');
  });

  it('must filter the table', () => {
    let input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = "AED";
    input.dispatchEvent(new KeyboardEvent('keyup'));
    expect(component.dataSource.filter).toBe('aed');
    fixture.detectChanges();
    let row = (fixture.nativeElement.querySelectorAll('table tr'))
    expect(row.length).toBe(1);
  });

  it('should sort the dataSource', () => {
    let buttons = fixture.nativeElement.querySelectorAll(
      'thead tr [role="button"]'
    );
    expect(buttons.length).toBe(2);
    let sort = component.dataSource.sort;
    let buttonClick: HTMLButtonElement = buttons[0];
    buttonClick.click();
    buttonClick.click();
    fixture.detectChanges();
    expect(sort?.direction).toEqual('desc');
  });
});
