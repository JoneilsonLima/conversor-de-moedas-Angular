import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMoedasComponent } from './tabela-moedas.component';

describe('TabelaMoedasComponent', () => {
  let component: TabelaMoedasComponent;
  let fixture: ComponentFixture<TabelaMoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaMoedasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
