import { TestBed } from '@angular/core/testing';

import { ClientesService } from './clientes.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClientesService', () => {
  let service: ClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ClientesService]
    });
    service = TestBed.inject(ClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
