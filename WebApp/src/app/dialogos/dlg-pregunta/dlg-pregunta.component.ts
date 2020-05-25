import { Component, OnInit, Inject } from '@angular/core';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Pregunta, Grado, Nivel, Prueba } from '../../Interfaces/interfaces.interface';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-pregunta',
  templateUrl: './dlg-pregunta.component.html',
  styles: []
})
export class DlgPreguntaComponent implements OnInit {


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
  leyendoPruebas = false;

  Grados: Grado[] = [];
  Niveles: Nivel[] = [];
  Pruebas: Prueba[] = [];

  constructor(public dialogRef: MatDialogRef<DlgPreguntaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accion = this.data.accion;
    this.id = this.data.idpregunta;


    if (this.accion === 'Editar') {
      this.obtenerPregunta();
    }

    this.leerGrados();
    this.leerNiveles();
    this.leerPruebas();
  }

  obtenerPregunta() {
    this.leyendoPregunta = true;
    this.genService.getPregunta(this.id).subscribe((rPregunta: Pregunta) => {
      this.pregunta = rPregunta;
      this.leyendoPregunta = false;
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

  leerPruebas() {
    this.leyendoPruebas = true;

    this.genService.getPruebas().subscribe((rPruebas: any) => {
      this.Pruebas = rPruebas.Pruebas;
      this.leyendoPruebas = false;
    });
  }

  guardarPregunta() {

    this.guardando = true;

    if (this.accion === 'Crear') {

      this.pregunta.idpregunta = new Utilidades().generarId();
      console.log(this.pregunta);
      const datos = JSON.stringify(this.pregunta);
      this.genService.postPregunta(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarPregunta();
      });
    } else {
      const datos = JSON.stringify(this.pregunta);

      this.genService.putPregunta(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarPregunta();
      });
    }
  }
  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
