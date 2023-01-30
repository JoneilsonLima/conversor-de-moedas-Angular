import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterMoedasComponent } from './converter-moedas.component';

describe('ConverterMoedasComponent', () => {
  let component: ConverterMoedasComponent;
  let fixture: ComponentFixture<ConverterMoedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterMoedasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverterMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
