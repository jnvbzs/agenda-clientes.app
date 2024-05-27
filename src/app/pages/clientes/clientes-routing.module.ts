import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { CriarClienteComponent } from './criar-cliente/criar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      {
        path: '',
        component: ListaClientesComponent,
      },
      {
        path: 'criar',
        component: CriarClienteComponent
      },
      {
        path: 'editar',
        component: EditarClienteComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
