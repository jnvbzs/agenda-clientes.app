import { Component, OnInit } from '@angular/core';
import {
  NgbProgressbarConfig,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ClientesService } from '../clientes.service';
import { Clientes } from '../cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule, NgbProgressbarModule],
  providers: [NgbProgressbarConfig],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.css',
})
export class ListaClientesComponent implements OnInit {
  public clientes?: Clientes;

  constructor(
    private clientesService: ClientesService,
    progressBarConfig: NgbProgressbarConfig
  ) {
    progressBarConfig.max = 1000;
    progressBarConfig.striped = true;
    progressBarConfig.animated = true;
    progressBarConfig.type = 'success';
    progressBarConfig.height = '20px';
  }

  ngOnInit(): void {
    this.clientesService.obterClientes().then((clientes) => {
      this.clientes = clientes;
    });
  }
}
