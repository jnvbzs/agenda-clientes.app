import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientesService } from './clientes.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [ClientesService],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {

}
