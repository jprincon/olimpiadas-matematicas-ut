import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizado'
})
export class CapitalizadoPipe implements PipeTransform {

  preposiciones: string[] = ['a', 'ante', 'bajo', 'con', 'contra', 'de', 'desde', 'en', 'entre', 'hacia', 'hasta', 'durante',
  'mediante', 'para', 'por', 'pro', 'según', 'sin', 'so', 'sobre', 'tras', 'versus', 'vía'];

  conectores: string[] = ['y', 'o', 'u', 'e', 'el', 'la'];

  esPreposicionConector(pp: string): boolean {
    return ((this.preposiciones.indexOf(pp) >= 0) || (this.conectores.indexOf(pp) >= 0));
  }

  transform(texto: string, todo: boolean = false): string {

    if ((texto === null) || (texto === undefined)) {
      return '';
    } else {

      const palabras: string[] = texto.toLowerCase().split(' ');
      const resultado: string[] = [];

      for (let palabra of palabras) {

        if (!this.esPreposicionConector(palabra)) {
          palabra = palabra.substr(0, 1).toUpperCase() + palabra.substr(1, palabra.length);
        }

        resultado.push(palabra);
      }

      return resultado.join(' ');
    }
  }

}
