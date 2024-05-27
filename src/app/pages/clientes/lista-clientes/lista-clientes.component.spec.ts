import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaClientesComponent } from './lista-clientes.component';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ListaClientesComponent', () => {
  let component: ListaClientesComponent;
  let fixture: ComponentFixture<ListaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaClientesComponent, HttpClientModule],
      providers: [ClientesService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.clientes = [
      {
        id: '4',
        nome: 'Ana Costa',
        email: 'ana.costa@example.com',
        dataNascimento: '1975-07-30',
        telefones: [
          {
            numero: '41987654321',
          },
        ],
        documentos: [
          {
            tipo: 2,
            numero: '246801357',
          },
        ],
        endereco: {
          logradouro: 'Rua do Comércio',
          numero: '101',
          cep: '80020000',
          bairro: 'Mercês',
          cidade: 'Curitiba',
          estado: 'PR',
          complemento: 'Apto 202',
        },
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#filtrarCliente deve filtrar um ou mais clientes dado um nome', () => {
    const nome = 'Ana';

    component.filtrarCliente(nome);

    const existeNomeSemCorresponderFiltro = component.clientesFiltrados?.some(
      (cliente) => !cliente.nome.includes(nome)
    );
    expect(existeNomeSemCorresponderFiltro).toBeFalse();
  });
});
