import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpcionPregunta } from '../../Interfaces/interfaces.interface';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-opcion-pregunta',
  templateUrl: './dlg-opcion-pregunta.component.html',
  styles: []
})
export class DlgOpcionPreguntaComponent implements OnInit {


  opcionpregunta: OpcionPregunta = {
    opcion: '',
    escorrecta: 'No',
    idpregunta: ''
  };

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;
  leyendo = false;

  constructor(public dialogRef: MatDialogRef<DlgOpcionPreguntaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accion = this.data.accion;
    this.id = this.data.idopcionpregunta;
    this.opcionpregunta.idpregunta = this.data.IdPregunta;


    if (this.accion === 'Editar') {
      this.leyendo = true;
      console.log('Estamos editando');

      this.leerOpcion();
    }
  }

  leerOpcion() {
    console.log(this.id);
    this.genService.getOpcionPregunta(this.id).subscribe((rOpcionPregunta: OpcionPregunta) => {
      this.opcionpregunta = rOpcionPregunta;
      this.leyendo = false;
    }, error => {
      this.leerOpcion();
    });
  }

  guardarOpcionPregunta() {

    this.guardando = true;

    if (this.accion === 'Crear') {

      this.opcionpregunta.idopcionpregunta = new Utilidades().generarId();
      console.log(this.opcionpregunta);
      const datos = JSON.stringify(this.opcionpregunta);
      this.genService.postOpcionPregunta(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarOpcionPregunta();
      });
    } else {
      const datos = JSON.stringify(this.opcionpregunta);

      this.genService.putOpcionPregunta(datos).subscribe((rRespuesta: any) => {
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarOpcionPregunta();
      });
    }
  }
  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
