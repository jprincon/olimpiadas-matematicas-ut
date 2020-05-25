import { TransferenciaService } from './../../Servicios/transferencia.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogoEsperaService } from '../../Servicios/dialogo-espera.service';
import { Usuario, Pregunta, OpcionPregunta, ImagenPregunta, RespuestaPregunta, PuntajePrueba } from '../../Interfaces/interfaces.interface';
import { LS_USUARIO, RUTA_PUNTAJES } from '../../config/constantes';
import { DialogService } from '../../Servicios/dialog.service';
import { Utilidades } from '../../Utilidades/utilidades.class';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: []
})
export class PruebaComponent implements OnInit {

  IdUsuario: string;
  IdPrueba: string;
  usuario: Usuario = {};

  Preguntas: Pregunta[] = [];
  bPreguntas: Pregunta[] = [];
  Opciones: OpcionPregunta[] = [];
  Imagenes: ImagenPregunta[] = [];

  opcionSeleccionada: OpcionPregunta = {};
  imagenSeleccionada: ImagenPregunta = {};

  preguntaSeleccionada: Pregunta = {};
  idPregunta = 0;

  nombrePrueba = '';

  leyendoOpciones = false;
  leyendoPregunta = false;
  evaluandoUsuario = false;
  leyendoImagenes = false;

  puedeEnviarCuestionario = false;

  validacion: any = {};

  constructor(private activateRouted: ActivatedRoute,
              private genService: ServiciosService,
              private dlgService: DialogService,
              private dialogoEsperaService: DialogoEsperaService) {

    console.clear();
               }

  ngOnInit() {
    // %%%%%%% Obtener los parámetros %%%%%%%
    this.genService.obtenerNuevoToken();
    this.obtenerParametros();
  }

  obtenerParametros() {

    this.evaluandoUsuario = true;
    this.IdUsuario = localStorage.getItem(LS_USUARIO).toString();
    this.activateRouted.params.subscribe((rParams: any) => {

      this.IdPrueba = rParams.IdPrueba;

      this.ValidarAccesoPrueba();
    });
  }

  // %%%%%%% Validar si el usuario puede presentar la prueba %%%%%%%
  ValidarAccesoPrueba() {
    const validacion = {
      idusuario: this.IdUsuario,
      idprueba: this.IdPrueba
    };

    console.log(validacion);

    const datos = JSON.stringify(validacion);

    this.genService.postValidarAccesoPrueba(datos).subscribe((rValidacion: any) => {
      console.log(rValidacion);
      this.validacion = rValidacion;

      // %%%%%%% Leer la prueba si el resultado de validación es correcto %%%%%%%
      this.genService.getPrueba(this.IdPrueba).subscribe((rPrueba: any) => {
        this.nombrePrueba = rPrueba.nombre;

        this.leerPreguntas();
      });
    });
  }

  leerPreguntas() {
    this.leyendoPregunta = true;
    this.genService.getPreguntasPrueba(this.IdPrueba, this.IdUsuario).subscribe((rPreguntas: any) => {
      console.log(rPreguntas);
      this.Preguntas = rPreguntas.Preguntas;

      this.evaluandoUsuario = false;
      this.seleccionarPregunta(0);

      this.leyendoPregunta = false;
    });
  }

  seleccionarPregunta(id: number) {
    this.idPregunta = id;
    this.preguntaSeleccionada = this.Preguntas[this.idPregunta];
    this.Opciones = this.preguntaSeleccionada.opciones;

    this.buscarOpcion(this.preguntaSeleccionada.opcionSeleccionada);
    this.Imagenes = this.preguntaSeleccionada.imagenes;

    this.validarEnviarCuestionario();

    console.log(this.Preguntas);
  }

  buscarOpcion(id: string) {
    this.opcionSeleccionada = {};

    for (const opcion of this.Opciones) {
      if (opcion.idopcionpregunta === id) {
        this.opcionSeleccionada = opcion;
        return;
      }
    }
  }

  validarEnviarCuestionario() {
    this.puedeEnviarCuestionario = true;
    for (const pregunta of this.Preguntas) {
      this.puedeEnviarCuestionario = this.puedeEnviarCuestionario && (pregunta.respondida === 'Si');
    }
  }

  guardarContinuar() {
    // %%%%%%% Crear objeto con los datos de la pregunta a guardar %%%%%%%

    if (!this.opcionSeleccionada.escorrecta && !this.opcionSeleccionada.idopcionpregunta ) {
      if (this.idPregunta < this.Preguntas.length) {
        this.idPregunta += 1;
        this.seleccionarPregunta(this.idPregunta);
      }
    } else {

      this.dialogoEsperaService.mostrarDialogoEspera('Guardando respuesta ...');
      const respuestaPregunta: RespuestaPregunta = {
        idusuario: localStorage.getItem(LS_USUARIO).toString(),
        idprueba: this.IdPrueba,
        idpregunta: this.preguntaSeleccionada.idpregunta,
        escorrecta: this.opcionSeleccionada.escorrecta,
        idopcion: this.opcionSeleccionada.idopcionpregunta
      };

      // %%%%%%% Agregar la marca de resuelta a la pregunta %%%%%%%
      this.preguntaSeleccionada.respondida = 'Si';
      this.preguntaSeleccionada.opcionSeleccionada = this.opcionSeleccionada.idopcionpregunta;

      const datos = JSON.stringify(respuestaPregunta);

      this.genService.putRespuestaPregunta(datos).subscribe((rRespuesta: any) => {
        this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);

        this.dialogoEsperaService.cerrarDialogoEspera();

        console.log(this.idPregunta, this.Preguntas.length);

        if (this.idPregunta < (this.Preguntas.length - 1)) {
          this.idPregunta += 1;
          this.seleccionarPregunta(this.idPregunta);
        } else {
          this.idPregunta = 0;
          this.seleccionarPregunta(this.idPregunta);
        }
      });
    }
  }

  cambiarOpcion() {
    // console.log(this.opcionSeleccionada);
  }

  cambiarImagen(imagen: ImagenPregunta) {
    this.imagenSeleccionada = imagen;
  }

  EnviarCuestionario() {

    console.log(this.Preguntas);

    const puntajePrueba: PuntajePrueba = {
      idpuntajeprueba: new Utilidades().generarId(),
      idusuario: this.IdUsuario,
      idprueba: this.IdPrueba,
      terminada: 'Si',
      nombreprueba: this.nombrePrueba,
      cantidadpreguntas: this.Preguntas.length.toString()
    };

    const datos = JSON.stringify(puntajePrueba);
    this.dialogoEsperaService.mostrarDialogoEspera('Enviando Cuestionario para Revisión ...');
    this.genService.postPuntajePrueba(datos).subscribe((rRespuesta: any) => {

      this.dialogoEsperaService.cerrarDialogoEspera();
      this.dlgService.mostrarSnackBar('Información', 'Haz terminado la prueba de forma exitosa');
      this.genService.navegar([RUTA_PUNTAJES]);
    });
  }

}
