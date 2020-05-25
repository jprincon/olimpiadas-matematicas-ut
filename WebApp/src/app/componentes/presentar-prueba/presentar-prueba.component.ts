import { TransferenciaService } from './../../Servicios/transferencia.service';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Prueba } from '../../Interfaces/interfaces.interface';
import { DialogoEsperaService } from '../../Servicios/dialogo-espera.service';

@Component({
  selector: 'app-presentar-prueba',
  templateUrl: './presentar-prueba.component.html',
  styles: []
})
export class PresentarPruebaComponent implements OnInit {

  Pruebas: Prueba[] = [];
  PruebaActual: Prueba = {
    estado: {
      presentar: 'No'
    }
  };

  constructor(private genService: ServiciosService,
              private transfer: TransferenciaService,
              private dialogEsperaService: DialogoEsperaService) { }

  ngOnInit() {
    this.dialogEsperaService.mostrarDialogoEspera('Leyendo Pruebas ...');
    this.leerPruebas();
  }

  leerPruebas() {
    this.genService.getPruebas().subscribe((rPruebas: any) => {

      this.dialogEsperaService.cerrarDialogoEspera();
      console.log(rPruebas);
      this.Pruebas = rPruebas.Pruebas;

      // %%%%%%% Se debe seleccionar cual es la actual o la mas cercana %%%%%%%
      this.PruebaActual = this.Pruebas[0];
    });
  }

  seleccionarPrueba(prueba: Prueba) {
    this.PruebaActual = prueba;
    console.log(this.PruebaActual);
  }

  PresentarPrueba() {
    // %%%%%%% Se selecciona la PruebaActual para validar si el usuario puede presentar y lo envía a la página de la prueba %%%%%%%
    this.genService.navegar(['prueba', this.PruebaActual.idprueba]);
  }

}
