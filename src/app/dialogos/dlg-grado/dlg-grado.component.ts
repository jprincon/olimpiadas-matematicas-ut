import { Component, OnInit, Inject } from '@angular/core';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grado } from '../../Interfaces/interfaces.interface';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-grado',
  templateUrl: './dlg-grado.component.html',
  styles: []
})
export class DlgGradoComponent implements OnInit {

  grado: Grado = {
    nombre: ''
  };

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;

  constructor(public dialogRef: MatDialogRef<DlgGradoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accion = this.data.accion;
    this.id = this.data.idgrado;


    if (this.accion === 'Editar') {
      this.genService.getGrado(this.id).subscribe((rGrado: Grado) => {
        this.grado = rGrado;
      });
    }
  }

  guardarGrado() {

    this.guardando = true;

    if (this.accion === 'Crear') {

      this.grado.idgrado = new Utilidades().generarId();
      console.log(this.grado);
      const datos = JSON.stringify(this.grado);
      this.genService.postGrado(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarGrado();
      });
    } else {
      const datos = JSON.stringify(this.grado);

      this.genService.putGrado(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarGrado();
      });
    }
  }

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
