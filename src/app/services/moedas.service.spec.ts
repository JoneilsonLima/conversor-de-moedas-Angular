import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MoedasService } from './moedas.service';

fdescribe('MoedasService', () => {
  let service: MoedasService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MoedasService);
    http = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${MoedasService.prototype.getSymbols.name} Must call a GET with the correct endpoint`, () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.getSymbols()
    expect(spy).toHaveBeenCalledWith('https://api.exchangerate.host/symbols')
  })

  it(`#${MoedasService.prototype.converterMoeda.name} should return conversion url from api`, () => {
    const spy = spyOn(http, 'get').and.callThrough()
    service.converterMoeda('USD', 'BRL', 10)
    expect(spy).toHaveBeenCalledWith(`https://api.exchangerate.host/convert?from=USD&to=BRL&amount=10`)
  })
});

