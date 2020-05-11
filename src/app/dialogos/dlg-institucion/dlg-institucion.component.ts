import { Component, OnInit, Inject } from '@angular/core';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Institucion } from '../../Interfaces/interfaces.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilidades } from '../../Utilidades/utilidades.class';

@Component({
  selector: 'app-dlg-institucion',
  templateUrl: './dlg-institucion.component.html',
  styles: []
})
export class DlgInstitucionComponent implements OnInit {


institucion: Institucion = {
  nombre: '',
  direccion: '',
  telefono: '',
  rector: ''
};

accion: string;
id: string;
contIntentos = 0;
guardando = false;

constructor(public dialogRef: MatDialogRef<DlgInstitucionComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private genService: ServiciosService,
            private snackBar: MatSnackBar) { }

ngOnInit() {
  this.accion = this.data.accion;
  this.id = this.data.idinstitucion;


  if (this.accion === 'Editar') {
    this.genService.getInstitucion(this.id).subscribe((rInstitucion: Institucion) => {
      this.institucion = rInstitucion;
    });
  }
}

guardarInstitucion() {

  this.guardando = true;

  if (this.accion === 'Crear') {

    this.institucion.idinstitucion = new Utilidades().generarId();
    console.log(this.institucion);
    const datos = JSON.stringify(this.institucion);
    this.genService.postInstitucion(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarInstitucion();
    });
  } else {
    const datos = JSON.stringify(this.institucion);

    this.genService.putInstitucion(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarInstitucion();
    });
  }
}

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
