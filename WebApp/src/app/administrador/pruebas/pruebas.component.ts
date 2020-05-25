import { Component, OnInit } from '@angular/core';
import { Prueba } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styles: []
})
export class PruebasComponent implements OnInit {

  Pruebas: Prueba[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerPruebas();
  }

  leerPruebas() {

    this.leyendo = true;

    this.genService.getPruebas().subscribe((rPruebas: any) => {
      this.Pruebas = rPruebas.Pruebas;
      console.log(rPruebas);
      this.leyendo = false;
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        this.leyendo = true;
      } else {
        this.leerPruebas();
      }
    });
  }

  agregarPrueba() {
    this.dlgService.DlgPrueba('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerPruebas();
    });
  }

  verPrueba(prueba: Prueba) {
    this.genService.navegar(['administrador', 'ver-prueba', prueba.idprueba]);
  }

  editarPrueba(prueba: Prueba) {
    this.dlgService.DlgPrueba('Editar', prueba.idprueba).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerPruebas();
    });
  }

  eliminarPrueba(prueba: Prueba) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Prueba?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(prueba.idprueba);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deletePrueba(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerPruebas();
    }, error => {
       this.eliminar(id);
    });
  }

}
