import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaMoedasComponent } from './tabela-moedas.component';
import { MoedasService } from 'src/app/services/moedas.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';




fdescribe('TabelaMoedasComponent', () => {
  let component: TabelaMoedasComponent;
  let fixture: ComponentFixture<TabelaMoedasComponent>;
  let service: MoedasService;
  let moeda: MoedasService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaMoedasComponent ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule
      ],
      providers:[TabelaMoedasComponent, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaMoedasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MoedasService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must initialize the dataSource', () => {
    expect(component.dataSource).toBeTruthy();
  })

  it('Must load coin table', () => {
      let table = fixture.debugElement.queryAll(By.css('table'));
      expect(table.length).toBe(1);
  })

  it('Must get input value from input', () => {
    let input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');
    input.value = 'BRL';
    expect(input.value).toBe('BRL');
  })

  it('should sort the dataSource', () => {
    let buttons = fixture.nativeElement.querySelectorAll('thead tr [role="button"]');
    expect(buttons.length).toBe(2);
    let sort = component.dataSource.sort;
    let buttonClick: HTMLButtonElement = buttons[0];
    buttonClick.click();
    buttonClick.click();
    fixture.detectChanges();
    expect(sort?.direction).toEqual("desc");
  });

});
