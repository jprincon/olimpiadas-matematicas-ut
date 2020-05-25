import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';
import { Nivel } from '../../Interfaces/interfaces.interface';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styles: []
})
export class NivelesComponent implements OnInit {

  Niveles: Nivel[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerNiveles();
  }

  leerNiveles() {

    this.leyendo = true;

    this.genService.getNiveles().subscribe((rNiveles: any) => {
      this.Niveles = rNiveles.Niveles;
      console.log(rNiveles);
      this.leyendo = false;
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        this.leyendo = true;
      } else {
        this.leerNiveles();
      }
    });
  }

  agregarNivel() {
    this.dlgService.DlgNivel('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerNiveles();
    });
  }

  editarNivel(nivel: Nivel) {
    this.dlgService.DlgNivel('Editar', nivel.idnivel).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerNiveles();
    });
  }

  eliminarNivel(nivel: Nivel) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Nivel?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(nivel.idnivel);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteNivel(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerNiveles();
    }, error => {
       this.eliminar(id);
    });
  }

}
