import { Component } from '@angular/core';
import { FormularioClienteComponent } from '../../../shared/templates/formulario-cliente/formulario-cliente.component';
import { FormularioCliente } from '../../../shared/templates/formulario-cliente/formulario-cliente';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { Cliente } from '../cliente';
import moment from 'moment';

@Component({
  selector: 'app-criar-cliente',
  standalone: true,
  imports: [RouterModule, FormularioClienteComponent],
  templateUrl: './criar-cliente.component.html',
  styleUrl: './criar-cliente.component.css',
})
export class CriarClienteComponent {
  public titulo = 'Criar cliente';
  public form?: FormGroup<FormularioCliente>;
  public telefoneControls: FormControl<string | null>[] = [];
  public documentosControls: FormControl<string | null>[] = [];

  constructor(
    private router: Router,
    private clientesService: ClientesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: this.fb.control<string | null>(null),
      email: this.fb.control<string | null>(null),
      dataNascimento: this.fb.control<string | null>(null),
      logradouro: this.fb.control<string | null>(null),
      cep: this.fb.control<string | null>(null),
      cidade: this.fb.control<string | null>(null),
      numero: this.fb.control<string | null>(null),
      estado: this.fb.control<string | null>(null),
      complemento: this.fb.control<string | null>(null),
      bairro: this.fb.control<string | null>(null),
    });

    this.telefoneControls.push(fb.control(''));
    this.documentosControls.push(fb.control(''));
  }

  criarCliente() {
    const cliente: Cliente = {
      nome: this.form?.controls.nome.value as string,
      email: this.form?.controls.email.value as string,
      dataNascimento: moment(
        this.form?.controls.dataNascimento.value,
        'DD/MM/YYYY'
      ).toISOString(),
      telefones: this.telefoneControls?.map((control) => {
        return { numero: control.value as string };
      }),
      documentos: this.documentosControls?.map((control) => {
        return { tipo: 1, numero: control.value as string };
      }),
      endereco: {
        logradouro: this.form?.controls.logradouro.value as string,
        cep: this.form?.controls.cep.value as string,
        cidade: this.form?.controls.cidade.value as string,
        numero: this.form?.controls.numero.value as string,
        estado: this.form?.controls.estado.value as string,
        complemento: this.form?.controls.complemento.value as string,
        bairro: this.form?.controls.bairro.value as string,
      },
    };

    this.clientesService.criarCliente(cliente).then(() => {
      this.voltar();
    });
  }

  voltar() {
    this.router.navigate(['clientes']);
  }
}
