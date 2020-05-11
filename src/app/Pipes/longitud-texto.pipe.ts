import { Pipe, PipeTransform } from '@angular/core';
import { text } from '@angular/core/src/render3';

@Pipe({
  name: 'longitudTexto'
})
export class LongitudTextoPipe implements PipeTransform {

  transform(texto: string, longitud: number): string {
    let rLongitud = 120;
    if (longitud !== undefined) {
      rLongitud = longitud;
    }

    if (texto.length <= rLongitud) {
      return texto;
    } else {
      return texto.substr(0, rLongitud) + '...';
    }
  }

}
