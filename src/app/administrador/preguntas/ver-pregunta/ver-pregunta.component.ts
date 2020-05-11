import { Component, OnInit } from '@angular/core';
import { Grado, Nivel, Pregunta, OpcionPregunta, ImagenPregunta, Prueba } from '../../../Interfaces/interfaces.interface';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../Servicios/servicios.service';
import { Utilidades } from '../../../Utilidades/utilidades.class';
import { DialogService } from '../../../Servicios/dialog.service';
import { DialogoEsperaService } from '../../../Servicios/dialogo-espera.service';

@Component({
  selector: 'app-ver-pregunta',
  templateUrl: './ver-pregunta.component.html',
  styles: []
})
export class VerPreguntaComponent implements OnInit {

  pregunta: Pregunta = {
    pregunta: '',
    idnivel: '',
    idgrado: ''
  };

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;

  leyendoGrados = false;
  leyendoNiveles = false;
  leyendoPregunta = false;
  leyendoOpciones = false;
  leyendoImagenes = false;

  Grados: Grado[] = [];
  Niveles: Nivel[] = [];
  Pruebas: Prueba[] = [];
  OpcionesPregunta: OpcionPregunta[] = [];
  ImagenesPregunta: ImagenPregunta[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private genService: ServiciosService,
              private dlgService: DialogService,
              private dialogoEsperaService: DialogoEsperaService) { }

  ngOnInit() {
    this.obtenerParametros();
    this.leerPruebas();
  }

  obtenerParametros() {
    this.activatedRoute.params.subscribe((rParams: any) => {
      this.pregunta.idpregunta = rParams.id;

      this.obtenerPregunta();
      this.leerNiveles();
      this.leerGrados();
      this.leerOpcionesPregunta();
      this.leerImagenesPregunta();
    });
  }

  obtenerPregunta() {
    this.leyendoPregunta = true;
    this.genService.getPregunta(this.pregunta.idpregunta).subscribe((rPregunta: Pregunta) => {
      console.log(rPregunta);
      this.pregunta = rPregunta;
      this.leyendoPregunta = false;
    }, error => {
      this.obtenerPregunta();
    });
  }

  leerPruebas() {
    this.genService.getPruebas().subscribe((rPruebas: any) => {
      console.log(rPruebas);
      this.Pruebas = rPruebas.Pruebas;
    });
  }

  leerGrados() {

    this.leyendoGrados = true;

    this.genService.getGrados().subscribe((rGrados: any) => {
      this.Grados = rGrados.Grados;
      this.leyendoGrados = false;
    }, error => {
      this.leerGrados();
    });
  }

  leerNiveles() {

    this.leyendoGrados = true;

    this.genService.getNiveles().subscribe((rGrados: any) => {
      this.Niveles = rGrados.Niveles;
      this.leyendoNiveles = false;
    }, error => {
      this.leerNiveles();
    });
  }

  guardarPregunta() {

    this.dialogoEsperaService.mostrarDialogoEspera('Guardando pregunta ...');
    const datos = JSON.stringify(this.pregunta);

    this.genService.putPregunta(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);

      this.dialogoEsperaService.cerrarDialogoEspera();
    });

  }

  leerOpcionesPregunta() {

    this.leyendoOpciones = true;

    this.genService.getOpcionesPregunta(this.pregunta.idpregunta).subscribe((rOpcionesPregunta: any) => {
      this.OpcionesPregunta = rOpcionesPregunta.OpcionesPreguntas;
      console.log(rOpcionesPregunta);
      this.leyendoOpciones = false;
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        this.leyendoOpciones = true;
      } else {
        this.leerOpcionesPregunta();
      }
    });
  }

  agregarOpcionPregunta() {
    this.dlgService.DlgOpcionPregunta('Crear', '', this.pregunta.idpregunta).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerOpcionesPregunta();
    });
  }

  editarOpcionPregunta(opcionpregunta: OpcionPregunta) {
    this.dlgService.DlgOpcionPregunta('Editar', opcionpregunta.idopcionpregunta, this.pregunta.idpregunta).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerOpcionesPregunta();
    });
  }

  eliminarOpcionPregunta(opcionpregunta: OpcionPregunta) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este OpcionPregunta?').subscribe((rConfirmacion: any) => {

      if (rConfirmacion) {
        this.genService.deleteOpcionPregunta(opcionpregunta.idopcionpregunta).subscribe((rRespuesta: any) => {
          console.log(rRespuesta);
          this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
          this.leerOpcionesPregunta();
        }, error => {
           this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        });
      }
    });
  }

  leerImagenesPregunta() {

    this.leyendoImagenes = true;

    this.genService.getImagenesPregunta(this.pregunta.idpregunta).subscribe((rImagenesPregunta: any) => {
      this.ImagenesPregunta = rImagenesPregunta.ImagenesPreguntas;
      console.log(rImagenesPregunta);
      this.leyendoImagenes = false;
    }, error => {
      this.leerImagenesPregunta();
    });
  }

  agregarImagenPregunta() {
    this.dlgService.DlgImagenPregunta('Crear', '', this.pregunta.idpregunta).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerImagenesPregunta();
    });
  }

  editarImagenPregunta(imagenpregunta: ImagenPregunta) {
    this.dlgService.DlgImagenPregunta('Editar', imagenpregunta.idimagenpregunta, this.pregunta.idpregunta).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerImagenesPregunta();
    });
  }

  eliminarImagenPregunta(imagenpregunta: ImagenPregunta) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este ImagenPregunta?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.genService.deleteImagenPregunta(imagenpregunta.idimagenpregunta).subscribe((rRespuesta: any) => {
          console.log(rRespuesta);
          this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
          this.leerImagenesPregunta();
        }, error => {
           this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        });
      }
    });
  }



}
