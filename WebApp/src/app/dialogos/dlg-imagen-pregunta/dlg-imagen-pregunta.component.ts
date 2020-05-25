import { Component, OnInit, Inject } from '@angular/core';
import { ImagenPregunta } from '../../Interfaces/interfaces.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-imagen-pregunta',
  templateUrl: './dlg-imagen-pregunta.component.html',
  styles: []
})
export class DlgImagenPreguntaComponent implements OnInit {


imagenpregunta: ImagenPregunta = {
  imagen: '',
  idpregunta: ''
};

imagenSubir: File;

accion: string;
id: string;
contIntentos = 0;
guardando = false;

constructor(public dialogRef: MatDialogRef<DlgImagenPreguntaComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private genService: ServiciosService,
            private snackBar: MatSnackBar) { }

ngOnInit() {
  this.accion = this.data.accion;
  this.id = this.data.idimagenpregunta;
  this.imagenpregunta.idpregunta = this.data.IdPregunta;


  if (this.accion === 'Editar') {
    this.genService.getImagenPregunta(this.id).subscribe((rImagenPregunta: ImagenPregunta) => {
      this.imagenpregunta = rImagenPregunta;
    });
  }
}

guardarImagenPregunta() {

  this.guardando = true;

  if (this.accion === 'Crear') {

    this.imagenpregunta.idimagenpregunta = new Utilidades().generarId();

    const datos = JSON.stringify(this.imagenpregunta);
    this.genService.postImagenPregunta(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarImagenPregunta();
    });
  } else {
    const datos = JSON.stringify(this.imagenpregunta);

    this.genService.putImagenPregunta(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarImagenPregunta();
    });
  }
}
mostrarSnackBar(titulo: string, msg: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: {Titulo: titulo, Mensaje: msg}, duration: 5000
  });
}

seleccionImagen( archivo: File) {

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

      this.imagenpregunta.imagen = reader.result.toString();

    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

}
