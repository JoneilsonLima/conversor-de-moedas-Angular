import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { TabelaMoedasComponent } from './tabela-moedas/tabela-moedas.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMoedasComponent } from './listagem-moedas.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';

describe('ListagemMoedasComponent', () => {
  let component: ListagemMoedasComponent;
  let fixture: ComponentFixture<ListagemMoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,

      ],
      declarations: [ ListagemMoedasComponent, TabelaMoedasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
