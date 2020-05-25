import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styles: []
})
export class MensajesComponent implements OnInit {

  Titulo = '';
  Mensaje = '';

  constructor(public dialogRef: MatDialogRef<MensajesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.Titulo = this.data.Titulo;
    this.Mensaje = this.data.Mensaje;
  }

  Aceptar() {
    this.dialogRef.close();
  }

}
