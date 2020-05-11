import { Component, OnInit } from '@angular/core';
import { Prueba, Pregunta } from '../../../Interfaces/interfaces.interface';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../Servicios/servicios.service';
import { DialogService } from '../../../Servicios/dialog.service';
import { DialogoEsperaService } from '../../../Servicios/dialogo-espera.service';

@Component({
  selector: 'app-ver-prueba',
  templateUrl: './ver-prueba.component.html',
  styles: []
})
export class VerPruebaComponent implements OnInit {

  prueba: Prueba = {};
  Preguntas: Pregunta[] = [];

  guardando = false;

  constructor(private activatedRoute: ActivatedRoute,
              private genService: ServiciosService,
              private dialogoEsperaService: DialogoEsperaService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.obtenerParametros();
  }

  obtenerParametros() {
    this.activatedRoute.params.subscribe((rParams: any) => {
      this.prueba.idprueba = rParams.id;

      this.obtenerPrueba();
    });
  }

  obtenerPrueba() {
    this.dialogoEsperaService.mostrarDialogoEspera('Leyendo Prueba ...');
    this.genService.getPrueba(this.prueba.idprueba).subscribe((rPrueba: Prueba) => {
      this.prueba = rPrueba;
      this.dialogoEsperaService.cerrarDialogoEspera();

      this.leerPreguntas();
    });
  }

  guardarPrueba() {
    this.dialogoEsperaService.mostrarDialogoEspera('Guardando Prueba ...');
    const datos = JSON.stringify(this.prueba);
    this.genService.putPrueba(datos).subscribe((rRespuesta: any) => {
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.dialogoEsperaService.cerrarDialogoEspera();
    });
  }

  // %%%%%%% Se obtiene las preguntas asociadas a la prueba %%%%%%%
  leerPreguntas() {
    this.dialogoEsperaService.mostrarDialogoEspera('Leyendo Preguntas ...');
    this.genService.getPreguntasPrueba(this.prueba.idprueba).subscribe((rPreguntas: any) => {
      this.Preguntas = rPreguntas.Preguntas;
      console.log(this.Preguntas);
      this.dialogoEsperaService.cerrarDialogoEspera();
    });
  }

}
