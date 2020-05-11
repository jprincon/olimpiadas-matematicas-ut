import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';
import { Rol } from '../../Interfaces/interfaces.interface';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: []
})
export class RolesComponent implements OnInit {

  Roles: Rol[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerRoles();
  }

  leerRoles() {

    this.leyendo = true;

    this.genService.getRoles().subscribe((rRoles: any) => {

      this.Roles = rRoles.Roles;
      this.leyendo = false;
    }, error => {

      this.leerRoles();
    });
  }

  agregarRol() {
    this.dlgService.DlgRol('Crear', '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerRoles();
    });
  }

  editarRol(rol: Rol) {
    this.dlgService.DlgRol('Editar', rol.idrol).subscribe((rRespuesta: any) => {

      this.leerRoles();
    });
  }

  eliminarRol(rol: Rol) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Rol?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(rol.idrol);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteRol(id).subscribe((rRespuesta: any) => {

      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerRoles();
    }, error => {
      this.eliminar(id);
    });
  }

}
