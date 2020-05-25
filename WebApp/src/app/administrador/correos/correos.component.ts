import { Component, OnInit } from '@angular/core';
import { Correo, Rol, Usuario } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styles: []
})
export class CorreosComponent implements OnInit {

  correo: Correo = {
    asunto: 'Registro de Estudiantes',
    titulo: 'Registro de Estudiantes',
    mensaje: 'Reciban un cordial saludo, estamos invitándolos para que registren a sus estudiantes para las olimpiadas de matemáticas lideradas por la Universidad del Tolima',
    usuarios: []
  };

  seleccionCorreos = '';

  leyendoRoles = false;
  leyendoUsuarios = false;
  enviandoCorreo = false;

  Roles: Rol[] = [];
  Usuarios: Usuario[] = [];

  constructor(private genService: ServiciosService,
              private dlgService: DialogService) { }

  ngOnInit() {
    this.leerRoles();
/*
    for (let i = 1; i < 100; i++) {
      this.Usuarios.push({correo: new Utilidades().generarId()});
    } */
  }

  leerRoles() {
    this.leyendoRoles = true;
    this.genService.getRoles().subscribe((rRoles: any) => {
      console.log(rRoles);
      this.Roles = rRoles.Roles;
      this.leyendoRoles = false;
    });
  }

  obtenerCorreos() {
    this.leyendoUsuarios = true;
    if (this.seleccionCorreos === 'Todos') {
      this.genService.getUsuarios().subscribe((rUsuarios: any) => {
        console.log(rUsuarios);
        this.Usuarios = rUsuarios.Usuarios;
        this.leyendoUsuarios = false;
      });
    } else {
      this.genService.getUsuariosPorRol(this.seleccionCorreos).subscribe((rUsuarios: any) => {
        console.log(rUsuarios);
        this.Usuarios = rUsuarios.Usuarios;
        this.leyendoUsuarios = false;
      });
    }
  }

  eliminarUsuario(usuario: Usuario) {
    const id = this.Usuarios.indexOf(usuario);
    this.Usuarios.splice(id, 1);
  }

  enviarCorreo() {
    this.enviandoCorreo = true;

    // %%%%%%% Crear la lista de usuarios %%%%%%%
    this.correo.usuarios = [];

    for (const usuario of this.Usuarios) {
      this.correo.usuarios.push({
        nombre: usuario.nombre,
        correo: usuario.correo
      });
    }

    const datos = JSON.stringify(this.correo);
    console.log(datos);

    this.genService.postEnviarCorreo(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.enviandoCorreo = false;
    });
  }

}
