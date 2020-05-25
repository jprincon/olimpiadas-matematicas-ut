import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempo'
})
export class TiempoPipe implements PipeTransform {

  transform(value: any): string {
    let result = '';
    let horas = 0;
    let minutos = 0;
    let dias = 0;

    if (value > 0) {
      horas = Math.floor(value / 60);
      // console.log(horas);
      minutos = value - (60 * horas);

      if (horas >= 24) {
        dias = Math.floor(horas / 24);
        horas = horas - 24 * dias;
      }

      if (dias > 0) {
        result = dias + 'días - ';
      }

      if (horas.toString().length === 1) {
        result = result + '0' + horas + 'h ';
      } else {
        result = result + horas + 'h ';
      }

      if (minutos.toString().length === 1) {
        result = result + ' : 0' + minutos + 'm ';
      } else {
        result = result + ' : ' + minutos + 'm ';
      }

      return result + ' : 00s';

    } else {
      return '00 : 00 : 00';
    }
  }

}
