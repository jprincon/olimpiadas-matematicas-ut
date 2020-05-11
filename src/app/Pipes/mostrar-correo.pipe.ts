import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarCorreo'
})
export class MostrarCorreoPipe implements PipeTransform {

  transform(value: string): string {
    let result = '';

    if (value) {
      const longitud = value.length - 7;
      result = value.substr(0, 5);

      for (let i = 0; i < longitud; i++) {
        result = result + '*';
      }

      result = result + value.substr(value.length - 2, 2);
    }

    return result;
  }

}
