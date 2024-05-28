import { FormControl } from '@angular/forms';

export interface FormularioCliente {
  nome: FormControl<string | null>;
  email: FormControl<string | null>;
  dataNascimento: FormControl<string | null>;
  logradouro: FormControl<string | null>;
  cep: FormControl<string | null>;
  cidade: FormControl<string | null>;
  numero: FormControl<string | null>;
  estado: FormControl<string | null>;
  bairro: FormControl<string | null>;
  complemento: FormControl<string | null>;
}
