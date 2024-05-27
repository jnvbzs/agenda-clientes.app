import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import {
  Cliente,
  Clientes,
  ClientesDto,
  DocumentoCliente,
  TelefoneCliente,
} from './cliente';

@Injectable()
export class ClientesService {
  private readonly _baseUrl = 'http://localhost:5259';

  constructor(private http: HttpClient) {}

  public obterClientes() {
    return lastValueFrom(
      this.http.get<ClientesDto>(`${this._baseUrl}/api/cliente`).pipe(
        map((clientes) => {
          return clientes.map<Cliente>((cliente) => {
            return {
              id: cliente.id,
              nome: cliente.nome,
              email: cliente.email,
              dataNascimento: cliente.dataNascimento,
              telefones: cliente.telefones.map<TelefoneCliente>((telefone) => {
                return { numero: telefone.numero };
              }),
              documentos: cliente.documentos.map<DocumentoCliente>(
                (documento) => {
                  return { tipo: documento.tipo, numero: documento.numero };
                }
              ),
              endereco: cliente.endereco,
            };
          });
        })
      )
    );
  }

  public removerCliente(id: string) {
    return lastValueFrom(
      this.http.delete(`${this._baseUrl}/api/cliente/${id}`)
    );
  }
}
