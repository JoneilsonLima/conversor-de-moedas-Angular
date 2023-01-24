import { TestBed } from '@angular/core/testing';

import { MoedasService } from './moedas.service';

describe('MoedasService', () => {
  let service: MoedasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoedasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
