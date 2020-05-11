import { Component, OnInit } from '@angular/core';
import { Pregunta } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styles: []
})
export class PreguntasComponent implements OnInit {

  Preguntas: Pregunta[] = [];
  bPreguntas: Pregunta[] = [];

  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  busqueda: any = {
    pregunta: '',
    prueba: '',
    nivel: '',
    grado: ''
  };

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerPreguntas();
  }

  leerPreguntas() {

    this.leyendo = true;

    this.genService.getPreguntas().subscribe((rPreguntas: any) => {
      this.Preguntas = rPreguntas.Preguntas;
      this.bPreguntas = this.Preguntas;

      this.leyendo = false;
    });
  }

  limpiarBusqueda() {
    this.bPreguntas = this.Preguntas;

    this.busqueda = {
      pregunta: '',
      prueba: '',
      nivel: '',
      grado: ''
    };
  }

  buscar(tipo: string) {
    this.bPreguntas = [];

    // %%%%%%% Buscar por pregunta %%%%%%%
    if (tipo === 'pregunta') {
      for (const pregunta of this.Preguntas) {
        const sPregunta = pregunta.pregunta.toLowerCase();
        if (sPregunta.indexOf(this.busqueda.pregunta) >= 0) {
          this.bPreguntas.push(pregunta);
        }
      }
    }

    // %%%%%%% Buscar por prueba %%%%%%%
    if (tipo === 'prueba') {
      for (const pregunta of this.Preguntas) {
        const sPrueba = pregunta.prueba.toLowerCase();
        if (sPrueba.indexOf(this.busqueda.prueba) >= 0) {
          this.bPreguntas.push(pregunta);
        }
      }
    }

    // %%%%%%% Buscar por nivel %%%%%%%
    if (tipo === 'nivel') {
      for (const pregunta of this.Preguntas) {
        const sNivel = pregunta.nivel.toLowerCase();
        if (sNivel.indexOf(this.busqueda.nivel) >= 0) {
          this.bPreguntas.push(pregunta);
        }
      }
    }

    // %%%%%%% Buscar por grado %%%%%%%
    if (tipo === 'grado') {
      for (const pregunta of this.Preguntas) {
        const sGrado = pregunta.grado.toLowerCase();
        if (sGrado.indexOf(this.busqueda.grado) >= 0) {
          this.bPreguntas.push(pregunta);
        }
      }
    }
  }

  agregarPregunta() {
    this.dlgService.DlgPregunta('Crear', '').subscribe((rRespuesta: any) => {
      this.dlgService.mostrarSnackBar('Información', rRespuesta);
      this.leerPreguntas();
    });
  }

  verPregunta(pregunta: Pregunta) {
    this.genService.navegar(['administrador', 'ver-pregunta', pregunta.idpregunta]);
  }

  editarPregunta(pregunta: Pregunta) {
    this.dlgService.DlgPregunta('Editar', pregunta.idpregunta).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerPreguntas();
    });
  }

  eliminarPregunta(pregunta: Pregunta) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Pregunta?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(pregunta.idpregunta);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deletePregunta(id).subscribe((rRespuesta: any) => {

      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerPreguntas();
    }, error => {
       this.eliminar(id);
    });
  }

}
