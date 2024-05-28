import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import {
  Cliente,
  ClienteDto,
  ClientesDto,
  DocumentoCliente,
  TelefoneCliente,
} from './cliente';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class ClientesService {
  private readonly _baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public obterClientes() {
    return lastValueFrom(
      this.http.get<ClientesDto>(`${this._baseUrl}/cliente`).pipe(
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

  public obterCliente(id: string) {
    return lastValueFrom(
      this.http
        .get<ClienteDto>(`${this._baseUrl}/cliente/${id}`)
        .pipe<Cliente>(
          map((cliente) => {
            return {
              id: cliente.id,
              nome: cliente.nome,
              email: cliente.email,
              dataNascimento: cliente.dataNascimento,
              documentos: cliente.documentos.map((documento) => {
                return {
                  tipo: documento.tipo,
                  numero: documento.numero,
                };
              }),
              endereco: cliente.endereco,
              telefones: cliente.telefones,
            };
          })
        )
    );
  }

  public removerCliente(id: string) {
    return lastValueFrom(this.http.delete(`${this._baseUrl}/cliente/${id}`));
  }

  public atualizarCliente(cliente: Cliente) {
    const { nome, dataNascimento, documentos, email, endereco, telefones } =
      cliente;

    const body = {
      nome,
      dataNascimento,
      documentos,
      email,
      endereco,
      telefones,
    };

    return lastValueFrom(
      this.http.put(`${this._baseUrl}/cliente/${cliente.id}`, body)
    );
  }
}
