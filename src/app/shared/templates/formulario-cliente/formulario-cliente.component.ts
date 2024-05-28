import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { FormularioCliente } from './formulario-cliente';
import { Subject } from 'rxjs';

@Component({
  selector: 'form-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.css',
})
export class FormularioClienteComponent {
  @Input() titulo?: string;
  @Input() form?: FormGroup<FormularioCliente>;
  @Input() telefoneControls?: FormControl<string | null>[];
  @Input() documentosControls?: FormControl<string | null>[];
  @Output() confirmarClick: Subject<void> = new Subject();
  @Output() voltarClick: Subject<void> = new Subject();

  constructor(private fb: FormBuilder) {}

  confirmar() {
    this.confirmarClick.next();
  }

  voltar() {
    this.voltarClick.next();
  }

  adicionarTelefone() {
    this.telefoneControls?.push(this.fb.control(''));
  }

  adicionarDocumento() {
    this.documentosControls?.push(this.fb.control(''));
  }

  removerTelefone(index: number) {
    this.telefoneControls?.splice(index, 1);
  }

  removerDocumento(index: number) {
    this.documentosControls?.splice(index, 1);
  }
}
