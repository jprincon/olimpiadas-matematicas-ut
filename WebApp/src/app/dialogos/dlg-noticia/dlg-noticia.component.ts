import { Component, OnInit, Inject } from '@angular/core';
import { Noticia } from '../../Interfaces/interfaces.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-noticia',
  templateUrl: './dlg-noticia.component.html',
  styles: []
})
export class DlgNoticiaComponent implements OnInit {


noticia: Noticia = {
  titulo: '',
  noticia: '',
  fechainicio: '',
  fechafin: '',
  imagen: ''
};

accion: string;
id: string;
contIntentos = 0;
guardando = false;
leyendoNoticia = false;

constructor(public dialogRef: MatDialogRef<DlgNoticiaComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private genService: ServiciosService,
            private snackBar: MatSnackBar) { }

ngOnInit() {
  this.accion = this.data.accion;
  this.id = this.data.idnoticia;


  if (this.accion === 'Editar') {
    this.leerNoticia();
  }
}

leerNoticia() {
  this.genService.getNoticia(this.id).subscribe((rNoticia: Noticia) => {
    this.noticia = rNoticia;
  }, error => {
    this.leerNoticia();
  });
}

guardarNoticia() {

  this.guardando = true;

  if (this.accion === 'Crear') {

    this.noticia.idnoticia = new Utilidades().generarId();
    console.log(this.noticia);
    const datos = JSON.stringify(this.noticia);
    console.log(datos);

    this.genService.postNoticia(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarNoticia();
    });
  } else {
    const datos = JSON.stringify(this.noticia);

    this.genService.putNoticia(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarNoticia();
    });
  }
}
mostrarSnackBar(titulo: string, msg: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: {Titulo: titulo, Mensaje: msg}, duration: 5000
  });
}

}
