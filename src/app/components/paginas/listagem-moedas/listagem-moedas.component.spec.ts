import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMoedasComponent } from './listagem-moedas.component';

describe('ListagemMoedasComponent', () => {
  let component: ListagemMoedasComponent;
  let fixture: ComponentFixture<ListagemMoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemMoedasComponent ]
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
