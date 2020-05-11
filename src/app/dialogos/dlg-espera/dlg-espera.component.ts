import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dlg-espera',
  templateUrl: './dlg-espera.component.html',
  styles: []
})
export class DlgEsperaComponent implements OnInit {

  textoEspera = 'Leyendo ...';

  constructor(public dialogRef: MatDialogRef<DlgEsperaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.textoEspera = this.data.textoEspera;
  }

}
