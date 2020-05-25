import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombrePersona'
})
export class NombrePersonaPipe implements PipeTransform {

  transform(value: string): any {
    let result = '';

    if (value) {
      result = value.split(' ')[0].toLocaleUpperCase();
    }

    return result;
  }

}
