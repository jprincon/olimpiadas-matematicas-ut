import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descargas'
})
export class DescargasPipe implements PipeTransform {

  transform(value: string): string {
    return 'http://201.185.240.142/downloads/sae_matematicas/' + value;
  }

}
