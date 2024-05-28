import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celular',
  standalone: true,
})
export class CelularPipe implements PipeTransform {
  transform(celular: string): string {
    const ddd = celular.slice(0, 2);
    const primeiraParte = celular.slice(2, 7);
    const segundaParte = celular.slice(7, 11);

    return `(${ddd}) ${primeiraParte}-${segundaParte}`;
  }
}
