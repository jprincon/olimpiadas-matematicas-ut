import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImagen'
})
export class NoImagenPipe implements PipeTransform {

  transform(value: any): any {

    if (!value) {
      return 'assets/Imagenes/noImagen.jpg';
    } else {
      return value;
    }
  }

}
