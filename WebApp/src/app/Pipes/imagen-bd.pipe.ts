import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenBd'
})
export class ImagenBdPipe implements PipeTransform {

  transform(value: string, argumento: string): string {
    // console.log(argumento);
    if (argumento === undefined) {
      return 'http://201.185.240.142/downloads/sae_matematicas/Imagenes/' + value;
    } else {
      return `http://201.185.240.142/downloads/sae_matematicas/${ argumento }/` + value;
    }
  }

}
