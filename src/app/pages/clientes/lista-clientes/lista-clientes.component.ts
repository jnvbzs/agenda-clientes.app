import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NgbAlertModule,
  NgbProgressbarConfig,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from '../clientes.service';
import { Cliente, Clientes } from '../cliente';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormularioListaClientes } from './formulario-lista-clientes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [
    CommonModule,
    NgbProgressbarModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NgbProgressbarConfig],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css',
})
export class ListaClientesComponent implements OnInit, OnDestroy {
  public clientes?: Clientes;

  public clientesFiltrados?: Clientes;

  public clienteModal?: Cliente;

  public form: FormGroup<FormularioListaClientes>;

  private _inputClienteChanges?: Subscription;

  constructor(
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private progressBarConfig: NgbProgressbarConfig
  ) {
    this.configurarProgressBar();

    this.form = this.fb.group<FormularioListaClientes>({
      cliente: this.fb.control<string | null>(null),
    });

    this._inputClienteChanges =
      this.form.controls.cliente.valueChanges.subscribe((value) => {
        if (value == '') this.clientesFiltrados = this.clientes;
      });
  }

  ngOnInit(): void {
    this.clientesService.obterClientes().then((clientes) => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  ngOnDestroy(): void {
    this._inputClienteChanges?.unsubscribe();
  }

  filtrarCliente(nome: string | null) {
    if (nome == null) this.clientesFiltrados = this.clientes;
    else
      this.clientesFiltrados = this.clientes?.filter((cliente) => {
        return cliente.nome.toLowerCase().includes(nome.toLowerCase());
      });
  }

  onInputKeyDown(event: Event) {
    if ((event as KeyboardEvent).key == 'Enter')
      this.filtrarCliente(this.form.controls.cliente.value);
  }

  limparFiltro() {
    this.clientesFiltrados = this.clientes;
    this.form.controls.cliente.reset();
  }

  definirClienteDoModal(cliente: Cliente) {
    this.clienteModal = cliente;
  }

  private configurarProgressBar() {
    this.progressBarConfig.max = 1000;
    this.progressBarConfig.striped = true;
    this.progressBarConfig.animated = true;
    this.progressBarConfig.type = 'success';
    this.progressBarConfig.height = '20px';
  }
}
