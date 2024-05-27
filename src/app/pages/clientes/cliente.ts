export interface ClienteDto {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  telefones: TelefonesClienteDto;
  documentos: DocumentosClienteDto;
  endereco: EnderecoClienteDto;
}

export type ClientesDto = ClienteDto[];

interface TelefoneClienteDto {
  numero: string;
}

type TelefonesClienteDto = TelefoneClienteDto[];

interface DocumentoClienteDto {
  tipo: number;
  numero: string;
}

type DocumentosClienteDto = DocumentoClienteDto[];

interface EnderecoClienteDto {
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  telefones: TelefonesCliente;
  documentos: DocumentosCliente;
  endereco: EnderecoCliente;
}

export type Clientes = Cliente[]; 

export interface TelefoneCliente {
  numero: string;
}

type TelefonesCliente = TelefoneCliente[];

export interface DocumentoCliente {
  tipo: number;
  numero: string;
}

type DocumentosCliente = DocumentoCliente[];

interface EnderecoCliente {
  logradouro: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  complemento: string;
}
