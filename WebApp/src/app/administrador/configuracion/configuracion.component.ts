import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Configuracion } from '../../Interfaces/interfaces.interface';
import { DialogService } from 'src/app/Servicios/dialog.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styles: []
})
export class ConfiguracionComponent implements OnInit {

  estado = false;
  leyendo = false;

  configuracion: Configuracion = {
    idconfiguracion: 'config-global',
    permiteinscripciones: 'No'
  };

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerConfiguracion();
  }

  cambiar() {
    this.estado = !this.estado;
    console.log(this.estado);
  }

  leerConfiguracion() {
    this.leyendo = true;
    this.genService.getConfiguracion('config-global').subscribe((rConfiguracion: Configuracion) => {
      console.log(rConfiguracion);

      this.configuracion.permiteinscripciones = rConfiguracion.permiteinscripciones;
      this.estado = rConfiguracion.permiteinscripciones === 'Si' ? true : false;
      this.leyendo = false;
    });
  }

  cambiarEstado() {
    console.log(this.estado);

    if (this.estado) {
      this.configuracion.permiteinscripciones = 'Si';
    } else {
      this.configuracion.permiteinscripciones = 'No';
    }

    console.log(this.configuracion);

    const datos = JSON.stringify(this.configuracion);

    this.genService.putConfiguracion(datos).subscribe((rRespuesta: any) => {
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
    });
  }

}
