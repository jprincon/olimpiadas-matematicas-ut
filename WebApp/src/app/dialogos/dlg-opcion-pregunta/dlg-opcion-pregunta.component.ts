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
    idpregunta: '',
    esimagen: 'No'
  };

  imagenSubir: File = null;

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;
  leyendo = false;
  bEsImagen = false;

  constructor(public dialogRef: MatDialogRef<DlgOpcionPreguntaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accion = this.data.accion;
    this.id = this.data.idopcionpregunta;
    this.opcionpregunta.idpregunta = this.data.IdPregunta;

    this.guardando = false;
    this.leyendo = false;


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

  cambiarVistaOpcion() {
    this.bEsImagen = !this.bEsImagen;

    if (this.bEsImagen) {
      this.opcionpregunta.esimagen = 'Si';
    } else {
      this.opcionpregunta.esimagen = 'No';
    }

    if (!this.bEsImagen) {
      this.opcionpregunta.opcion = '';
    }
  }

  seleccionImagen(archivo: File  ) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // %%%%%%% Subir Archivo %%%%%%%
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);
    reader.onload = () => {
      // console.log(reader.result);

      this.opcionpregunta.opcion = reader.result.toString();

    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
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
