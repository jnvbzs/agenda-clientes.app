import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'moment',
  standalone: true,
})
export class MomentPipe implements PipeTransform {
  transform(data: string | undefined, formato: string): string {
    if (data) return moment(data).format(formato);
    return '';
  }
}
