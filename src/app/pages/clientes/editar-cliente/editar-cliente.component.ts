import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormularioEditarCliente } from './formulario-editar-cliente';
import moment from 'moment';
import { NgxMaskDirective } from 'ngx-mask';
import { Cliente } from '../cliente';
import { FormularioClienteComponent } from '../../../shared/templates/formulario-cliente/formulario-cliente.component';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    FormularioClienteComponent,
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css',
})
export class EditarClienteComponent {
  public titulo = 'Editar cliente';

  public form?: FormGroup<FormularioEditarCliente>;
  public cliente?: Cliente;
  public telefoneControls: FormControl<string | null>[] = [];
  public documentosControls: FormControl<string | null>[] = [];

  private _idCliente?: string;

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const idCliente = (params as { id: string }).id;

      this._idCliente = idCliente;

      this.clientesService.obterCliente(idCliente).then((cliente) => {
        this.cliente = cliente;

        this.cliente.telefones.forEach((telefone) => {
          this.telefoneControls.push(this.fb.control(telefone.numero));
        });

        this.cliente.documentos.forEach((documento) => {
          this.documentosControls.push(this.fb.control(documento.numero));
        });

        this.form = this.fb.group({
          nome: this.fb.control(cliente.nome),
          email: this.fb.control(cliente.email),
          dataNascimento: this.fb.control(
            moment(new Date(cliente.dataNascimento)).format('DD/MM/YYYY')
          ),
          logradouro: this.fb.control(cliente.endereco.logradouro),
          cep: this.fb.control(cliente.endereco.cep),
          cidade: this.fb.control(cliente.endereco.cidade),
          numero: this.fb.control(cliente.endereco.numero),
          estado: this.fb.control(cliente.endereco.estado),
          complemento: this.fb.control(cliente.endereco.complemento),
          bairro: this.fb.control(cliente.endereco.bairro),
        });
      });
    });
  }

  atualizarCliente() {
    const clienteAtualizado: Cliente = {
      id: this._idCliente,
      nome: this.form?.controls.nome.value as string,
      email: this.form?.controls.email.value as string,
      dataNascimento: moment(
        this.form?.controls.dataNascimento.value,
        'DD/MM/YYYY'
      ).toISOString(),
      telefones: this.telefoneControls.map((control) => {
        return { numero: control.value as string };
      }),
      documentos: this.documentosControls.map((control) => {
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

    this.clientesService
      .atualizarCliente(clienteAtualizado)
      .then(() => this.voltar());
  }

  voltar() {
    this.router.navigate(['clientes']);
  }
}
