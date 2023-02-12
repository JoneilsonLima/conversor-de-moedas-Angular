import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarComponent } from './snack-bar.component';

import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';


describe('SnackBarComponent', () => {
  let component: SnackBarComponent;
  let fixture: ComponentFixture<SnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarComponent ],
      imports: [
        MatSnackBarModule
      ],
      providers: [{
        provide: MatSnackBarRef,
        useValue: {}
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
