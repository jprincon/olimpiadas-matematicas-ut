import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Ruta } from '../../Interfaces/interfaces.interface';

@Component({
  selector: 'app-dlg-ruta',
  templateUrl: './dlg-ruta.component.html',
  styles: []
})
export class DlgRutaComponent implements OnInit {


  ruta: Ruta = {
    ruta: ''
  };

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;

  constructor(public dialogRef: MatDialogRef<DlgRutaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accion = this.data.accion;
    this.id = this.data.idruta;


    if (this.accion === 'Editar') {
      this.genService.getRuta(this.id).subscribe((rRuta: Ruta) => {
        this.ruta = rRuta;
      });
    }
  }

  guardarRuta() {

    this.guardando = true;

    if (this.accion === 'Crear') {

      this.ruta.idruta = new Utilidades().generarId();
      console.log(this.ruta);
      const datos = JSON.stringify(this.ruta);
      this.genService.postRuta(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarRuta();
      });
    } else {
      const datos = JSON.stringify(this.ruta);

      this.genService.putRuta(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarRuta();
      });
    }
  }

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
