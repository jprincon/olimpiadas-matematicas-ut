import { Injectable } from '@angular/core';
import { DlgEsperaComponent } from '../dialogos/dlg-espera/dlg-espera.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogoEsperaService {

  dialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog) { }

  mostrarDialogoEspera(textoEspera: string) {

    this.cerrarDialogoEspera();

    this.dialogRef = this.dialog.open(DlgEsperaComponent, {
      data: {textoEspera}
    });

    // return dialogRef.afterClosed();
  }

  cerrarDialogoEspera() {
    if (this.dialogRef !== undefined) {
      this.dialogRef.close();
    }
  }
}
