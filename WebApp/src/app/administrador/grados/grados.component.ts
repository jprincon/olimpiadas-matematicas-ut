import { Component, OnInit } from '@angular/core';
import { Grado } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-grados',
  templateUrl: './grados.component.html',
  styles: []
})
export class GradosComponent implements OnInit {

  Grados: Grado[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerGrados();
  }

  leerGrados() {

    this.leyendo = true;

    this.genService.getGrados().subscribe((rGrados: any) => {
      this.Grados = rGrados.Grados;
      console.log(rGrados);
      this.leyendo = false;
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        this.leyendo = true;
      } else {
        this.leerGrados();
      }
    });
  }

  agregarGrado() {
    this.dlgService.DlgGrado('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerGrados();
    });
  }

  editarGrado(grado: Grado) {
    this.dlgService.DlgGrado('Editar', grado.idgrado).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerGrados();
    });
  }

  eliminarGrado(grado: Grado) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Grado?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(grado.idgrado);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteGrado(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerGrados();
    }, error => {
      this.eliminar(id);
    });
  }

}
