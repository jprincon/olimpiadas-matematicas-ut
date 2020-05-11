import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prueba } from '../../Interfaces/interfaces.interface';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-prueba',
  templateUrl: './dlg-prueba.component.html',
  styles: []
})
export class DlgPruebaComponent implements OnInit {


prueba: Prueba = {
  nombre: '',
  fecha: '',
  horainicio: '',
  horafin: '',
  descripcion: '',
  estado: {
    dias: '',
    estado: '',
    horas: 0
  }
};

accion: string;
id: string;
contIntentos = 0;
guardando = false;
leyendo = false;

constructor(public dialogRef: MatDialogRef<DlgPruebaComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any,
            private genService: ServiciosService,
            private snackBar: MatSnackBar) { }

ngOnInit() {
  this.accion = this.data.accion;
  this.id = this.data.idprueba;


  if (this.accion === 'Editar') {
    this.genService.getPrueba(this.id).subscribe((rPrueba: Prueba) => {
      console.log(rPrueba);
      this.prueba = rPrueba;
    });
  }
}

guardarPrueba() {

  this.guardando = true;

  if (this.accion === 'Crear') {

    this.prueba.idprueba = new Utilidades().generarId();
    console.log(this.prueba.fecha);
    const datos = JSON.stringify(this.prueba);
    this.genService.postPrueba(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarPrueba();
    });
  } else {
    const datos = JSON.stringify(this.prueba);
    console.log(this.prueba.fecha);
    this.genService.putPrueba(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
    }, error => {

      this.guardarPrueba();
    });
  }
}

mostrarSnackBar(titulo: string, msg: string) {
  this.snackBar.openFromComponent(SnackbarComponent, {
    data: {Titulo: titulo, Mensaje: msg}, duration: 5000
  });
}

}
