import { Component, OnInit } from '@angular/core';
import { NOMBRE_APP } from '../../config/constantes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  Fecha: string;
  Hora: string;
  nombreApp = NOMBRE_APP;

  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                     'Julio', 'Agosto', 'Septiembre', 'Noviembre', 'Diciembre'];

  constructor() { }

  ngOnInit() {
    this.obtenerFechaHora();
  }

  obtenerFechaHora() {
    const Fecha = new Date();

    const dia = Fecha.getDate();
    const mes = Fecha.getMonth();
    const ano = Fecha.getFullYear();

    const hora = Fecha.getHours();
    const minuto = Fecha.getMinutes();
    const segundo = Fecha.getSeconds();

    this.Fecha = `${ dia } de ${ this.meses[mes] } del ${ ano } - ${ hora } : ${ minuto} : ${ segundo }`;
  }

}
