import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguro'
})
export class DomSeguroPipe implements PipeTransform {

  constructor(private domSanitizier: DomSanitizer) {

  }

  transform(value: string, url: string): any {
    console.log(url + value);

    if (url !== undefined) {
      return this.domSanitizier.bypassSecurityTrustResourceUrl(url + value);
    } else {
      return this.domSanitizier.bypassSecurityTrustResourceUrl(value);
    }
  }

}
