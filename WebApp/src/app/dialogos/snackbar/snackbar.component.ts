import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styles: []
})
export class SnackbarComponent implements OnInit {

  Titulo: string;
  Mensaje: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.Titulo = this.data.Titulo;
    this.Mensaje = this.data.Mensaje;
  }

}
