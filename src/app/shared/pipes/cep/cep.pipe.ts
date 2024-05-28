import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true,
})
export class CepPipe implements PipeTransform {
  transform(cep: string | undefined): string {
    const primeiraParte = cep?.slice(0, 5);
    const segundaParte = cep?.slice(5, 8);

    return `${primeiraParte}-${segundaParte}`;
  }
}
