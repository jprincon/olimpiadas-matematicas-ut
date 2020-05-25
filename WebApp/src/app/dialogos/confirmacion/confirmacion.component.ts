import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styles: []
})
export class ConfirmacionComponent implements OnInit {

  Msg = '';
  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.Msg = this.data.Msg;
  }

  Aceptar() {
    this.dialogRef.close(true);
  }

  Cancelar() {
    this.dialogRef.close(false);
  }

}
