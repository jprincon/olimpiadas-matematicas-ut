import { TransferenciaService } from './../../Servicios/transferencia.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogoEsperaService } from '../../Servicios/dialogo-espera.service';
import { Usuario, Pregunta, OpcionPregunta, ImagenPregunta } from '../../Interfaces/interfaces.interface';

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
  Opciones: OpcionPregunta[] = [];
  Imagenes: ImagenPregunta[] = [];

  opcionSeleccionada: OpcionPregunta = {};
  imagenSeleccionada: ImagenPregunta = {};

  preguntaSeleccionada: Pregunta = {};
  idPregunta = 0;

  nombrePrueba = '';

  constructor(private activateRouted: ActivatedRoute,
              private genService: ServiciosService,
              private transfer: TransferenciaService,
              private dialogoEsperaService: DialogoEsperaService) {

    console.clear();
               }

  ngOnInit() {
    // %%%%%%% Obtener los parámetros %%%%%%%
    this.obtenerParametros();
  }

  obtenerParametros() {

    this.dialogoEsperaService.mostrarDialogoEspera('Evaluando Usuario ...');

    this.activateRouted.params.subscribe((rParams: any) => {
      console.log('Params', rParams);

      this.IdUsuario = rParams.IdUsuario;
      this.IdPrueba = rParams.IdPrueba;

      // %%%%%%% Obtener la prueba %%%%%%%
      this.genService.getPrueba(this.IdPrueba).subscribe((rPrueba: any) => {
        this.nombrePrueba = rPrueba.nombre;
      });

      // %%%%%%% Obtener el usuario a través de una transferencia %%%%%%%
      this.transfer.obtenerUsuario.subscribe((rUsuario: Usuario) => {
        this.usuario = rUsuario;
        console.log('Transfer', rUsuario);

        // %%%%%%% Evaluar si el usuario puede presentar la prueba %%%%%%%
        this.evaluarUsuario();
      });
    });
  }

  evaluarUsuario() {

    /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       ¿CÓMO VALIDAR?
       El Usuario dene existir o estar logeado, además debe tener permiso para presentar la prueba
    =========================================================================================================================*/

    this.leerPreguntas();
  }

  leerPreguntas() {
    this.genService.getPreguntasPrueba(this.IdPrueba).subscribe((rPreguntas: any) => {
      console.log(rPreguntas);
      this.Preguntas = rPreguntas.Preguntas;
      this.dialogoEsperaService.cerrarDialogoEspera();

      this.preguntaSeleccionada = this.Preguntas[0];
      this.leerOpcionesPregunta();
      this.leerImagenesPregunta();
    });
  }

  seleccionarPregunta(pregunta: Pregunta, id: number) {
    this.preguntaSeleccionada = pregunta;
    this.idPregunta = id;

    this.leerOpcionesPregunta();
    this.leerImagenesPregunta();
  }

  leerOpcionesPregunta() {
    // %%%%%%% Leer opciones de pregunta %%%%%%%
    this.genService.getOpcionesPregunta(this.preguntaSeleccionada.idpregunta).subscribe((rOpciones: any) => {
      this.Opciones = rOpciones.OpcionesPreguntas;
      console.log(rOpciones);
    });
  }

  leerImagenesPregunta() {
    // %%%%%%% Leer imágenes pregunta %%%%%%%
    this.genService.getImagenesPregunta(this.preguntaSeleccionada.idpregunta).subscribe((rPreguntas: any) => {
      console.log(rPreguntas);
      this.Imagenes = rPreguntas.ImagenesPreguntas;

      if (this.Imagenes.length > 0) {
        this.imagenSeleccionada = this.Imagenes[0];
      }
    });
  }

  guardarContinuar() {
    console.log(this.opcionSeleccionada);
    this.idPregunta += 1;
    this.preguntaSeleccionada = this.Preguntas[this.idPregunta];

    this.leerOpcionesPregunta();
    this.leerImagenesPregunta();
  }

  cambiarImagen(imagen: ImagenPregunta) {
    this.imagenSeleccionada = imagen;
  }

}
