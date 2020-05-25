import { Component, OnInit, Inject } from '@angular/core';
import { Nivel } from '../../Interfaces/interfaces.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dlg-nivel',
  templateUrl: './dlg-nivel.component.html',
  styles: []
})
export class DlgNivelComponent implements OnInit {

  nivel: Nivel = {
    nombre: ''
  };

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;

  constructor(public dialogRef: MatDialogRef<DlgNivelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.accion = this.data.accion;
    this.id = this.data.idnivel;


    if (this.accion === 'Editar') {
      this.genService.getNivel(this.id).subscribe((rNivel: Nivel) => {
        this.nivel = rNivel;
      });
    }
  }

  guardarNivel() {

    this.guardando = true;

    if (this.accion === 'Crear') {

      this.nivel.idnivel = new Utilidades().generarId();
      console.log(this.nivel);
      const datos = JSON.stringify(this.nivel);
      this.genService.postNivel(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarNivel();
      });
    } else {
      const datos = JSON.stringify(this.nivel);

      this.genService.putNivel(datos).subscribe((rRespuesta: any) => {
        console.log(rRespuesta);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      }, error => {

        this.guardarNivel();
      });
    }
  }

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
