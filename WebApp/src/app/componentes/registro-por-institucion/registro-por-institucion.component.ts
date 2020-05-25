import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Usuario, Configuracion } from '../../Interfaces/interfaces.interface';
import { DialogService } from '../../Servicios/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogoEsperaService } from 'src/app/Servicios/dialogo-espera.service';

@Component({
  selector: 'app-registro-por-institucion',
  templateUrl: './registro-por-institucion.component.html',
  styles: []
})
export class RegistroPorInstitucionComponent implements OnInit {

  IdInstitucion = '';

  configuracion: Configuracion = {
    permiteinscripciones: 'Si'
  };

  Usuarios: Usuario[] = [];

  leyendo = false;
  eliminando = false;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService,
              private dlgEspera: DialogoEsperaService) { }

  ngOnInit() {
    this.ActualizarLista();
  }

  registrarEstudiante() {
    // %%%%%%% Comprobar si es un Id Válido %%%%%%%
    this.genService.getInstitucion(this.IdInstitucion).subscribe((rInstitucion: any) => {
      console.log(rInstitucion);
    });
  }

  ActualizarLista() {
    this.leyendo = true;
    this.genService.getUsuariosPorInstitucion(this.IdInstitucion).subscribe((rUsuarios: any) => {
      console.log(rUsuarios);
      this.Usuarios = rUsuarios.Usuarios;
      this.leyendo = false;
    });
  }

  AgregarEstudiante() {
    this.genService.getConfiguracion('config-global').subscribe((rConfiguracion: Configuracion) => {
      this.configuracion = rConfiguracion;

      if (rConfiguracion.permiteinscripciones === 'Si') {
        this.dlgService.DlgUsuario('Crear', '', true, this.IdInstitucion).subscribe((rRespuesta: any) => {
          console.log(rRespuesta);
          this.ActualizarLista();
        });
      }
    });
  }

  editarEstudiante(usuario: Usuario) {
    this.dlgService.DlgUsuario('Editar', usuario.idusuario, true, this.IdInstitucion).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.ActualizarLista();
    });
  }

  eliminarEstudiante(usuario: Usuario) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Usuario?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {

        this.genService.deleteUsuario(usuario.idusuario).subscribe((rRespuesta: any) => {
          this.eliminando = false;
          this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
          this.ActualizarLista();
        });
      }
    });
  }

}
