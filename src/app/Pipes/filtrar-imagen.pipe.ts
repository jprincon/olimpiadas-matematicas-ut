import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarImagen'
})
export class FiltrarImagenPipe implements PipeTransform {

  transform(imagen: string, defecto: string = 'assets/Imagenes/noImagen.png'): string {

    if (( imagen === null ) || (imagen === undefined)) {
      return defecto;
    } else {

      return imagen;
    }
  }

}
