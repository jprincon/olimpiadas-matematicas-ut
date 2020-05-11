import { Component, OnInit } from '@angular/core';
import { Institucion } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styles: []
})
export class InstitucionesComponent implements OnInit {

  Instituciones: Institucion[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerInstituciones();
  }

  leerInstituciones() {

    this.leyendo = true;

    this.genService.getInstituciones().subscribe((rInstituciones: any) => {
      this.Instituciones = rInstituciones.Instituciones;
      console.log(rInstituciones);
      this.leyendo = false;
    }, error => {
      this.leerInstituciones();
    });
  }

  agregarInstitucion() {
    this.dlgService.DlgInstitucion('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerInstituciones();
    });
  }

  editarInstitucion(institucion: Institucion) {
    this.dlgService.DlgInstitucion('Editar', institucion.idinstitucion).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerInstituciones();
    });
  }

  eliminarInstitucion(institucion: Institucion) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Institucion?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(institucion.idinstitucion);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteInstitucion(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerInstituciones();
    }, error => {
       this.eliminar(id);
    });
  }

}
