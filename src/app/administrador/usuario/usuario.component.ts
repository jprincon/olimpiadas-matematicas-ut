import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Usuario, Rol, Institucion, Grado } from '../../Interfaces/interfaces.interface';
import { SnackbarComponent } from '../../dialogos/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  idUsuario: string;
  usuario: Usuario = {
    nombre: '',
    correo: '',
    contra: '',
    telefono: '',
    idinstitucion: '',
    idrol: '',
    idgrado: ''
  };

  leyendo = false;
  advertenciaLectura = '';
  contIntentos = 0;

  leyendoGrados = false;
  leyendoInstituciones = false;
  leyendoRoles = false;

  Roles: Rol[] = [];
  Instituciones: Institucion[] = [];
  Grados: Grado[] = [];

  advertenciaInstituciones = '';
  advertenciaGrados = '';
  advertenciaRoles = '';

  guardando = false;

  constructor(private activatedRouted: ActivatedRoute,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.obtenerParametros();
  }

  obtenerParametros() {
    this.activatedRouted.params.subscribe((rParam: any) => {
      this.idUsuario = rParam.id;

      this.obtenerUsuario();
    });
  }

  obtenerUsuario() {
    this.leyendo = true;

    this.genService.getUsuario(this.idUsuario).subscribe((rUsuario: Usuario) => {
     this.usuario = rUsuario;
     this.leyendo = false;

     this.leerRoles();
     this.leerInstituciones();
     this.leerGrados();

    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.advertenciaLectura = 'El Servidor no responde, consultando datos ...';
      } else {
        this.obtenerUsuario();
      }
    });
  }

  leerRoles() {

    this.leyendoRoles = true;

    this.genService.getRoles().subscribe((rRoles: any) => {
      this.Roles = rRoles.Roles;
      console.log(rRoles);
      this.leyendoRoles = false;
      this.advertenciaRoles = '';
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.advertenciaRoles = 'No se pudo establecer conexión con el servidor';
        this.leyendoRoles = true;
      } else {
        this.leerRoles();
      }
    });
  }

  leerGrados() {

    this.leyendoGrados = true;

    this.genService.getGrados().subscribe((rGrados: any) => {
      this.Grados = rGrados.Grados;
      console.log(rGrados);
      this.leyendoGrados = false;
      this.advertenciaGrados = '';
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.advertenciaGrados = 'No se pudo establecer conexión con el servidor';
        this.leyendoGrados = true;
      } else {
        this.leerGrados();
      }
    });
  }

  leerInstituciones() {

    this.leyendoInstituciones = true;

    this.genService.getInstituciones().subscribe((rInstituciones: any) => {
      this.Instituciones = rInstituciones.Instituciones;
      console.log(rInstituciones);
      this.leyendoInstituciones = false;
      this.advertenciaInstituciones = '';
    }, error => {
      this.contIntentos = this.contIntentos + 1;
      if (this.contIntentos > 3) {
        this.advertenciaInstituciones = 'No se pudo establecer conexión con el servidor';
        this.leyendoInstituciones = true;
      } else {
        this.leerInstituciones();
      }
    });
  }

  guardarUsuario() {

    this.guardando = true;

    const password = new Md5().appendStr(this.usuario.contra).end().toString();
    this.usuario.contra = password;

    const datos = JSON.stringify(this.usuario);

    this.genService.putUsuario(datos).subscribe((rRespuesta: any) => {
      this.guardando = false;
    });
  }

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
