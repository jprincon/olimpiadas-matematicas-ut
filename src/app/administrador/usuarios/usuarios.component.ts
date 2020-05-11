import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { DialogService } from '../../Servicios/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  Usuarios: Usuario[] = [];
  leyendo = false;
  eliminando = false;
  contIntentos = 1;

  constructor(private genService: ServiciosService,
              private dlgService: DialogService,
              private router: Router) { }

  ngOnInit() {
    this.leerUsuarios();
  }

  leerUsuarios() {

    this.leyendo = true;

    this.genService.getUsuarios().subscribe((rUsuarios: any) => {
      this.Usuarios = rUsuarios.Usuarios;
      console.log(rUsuarios);
      this.leyendo = false;
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.dlgService.mostrarSnackBar('Error', 'No se pudo establecer conexión con el servidor');
        this.leyendo = true;
      } else {
        this.leerUsuarios();
      }
    });
  }

  agregarUsuario() {
    this.dlgService.DlgUsuario('Crear', '', false, '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerUsuarios();
    });
  }

  verUsuario(usuario: Usuario) {
    this.router.navigate(['administrador', 'usuario', usuario.idusuario]);
  }

  editarUsuario(usuario: Usuario) {
    this.dlgService.DlgUsuario('Editar', usuario.idusuario, false, '').subscribe((rRespuesta: any) => {
      console.log(rRespuesta);
      this.leerUsuarios();
    });
  }

  eliminarUsuario(usuario: Usuario) {
    this.dlgService.confirmacion('¿Está seguro de eliminar este Usuario?').subscribe((rConfirmacion: any) => {
      console.log(rConfirmacion);
      if (rConfirmacion) {
        this.eliminar(usuario.idusuario);
      }
    });
  }

  eliminar(id: string) {
    this.eliminando = true;
    this.genService.deleteUsuario(id).subscribe((rRespuesta: any) => {
      this.eliminando = false;
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.leerUsuarios();
    }, error => {
       this.eliminar(id);
    });
  }

}
