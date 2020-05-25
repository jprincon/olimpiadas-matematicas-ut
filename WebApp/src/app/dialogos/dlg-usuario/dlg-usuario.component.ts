import { Component, OnInit, Inject } from '@angular/core';
import { Usuario, Rol, Institucion, Grado } from '../../Interfaces/interfaces.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiciosService } from '../../Servicios/servicios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utilidades } from '../../Utilidades/utilidades.class';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { DialogService } from '../../Servicios/dialog.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-dlg-usuario',
  templateUrl: './dlg-usuario.component.html',
  styles: []
})
export class DlgUsuarioComponent implements OnInit {


  usuario: Usuario = {
    nombre: '',
    correo: '',
    contra: '',
    telefono: '',
    idinstitucion: '',
    idrol: '',
    idgrado: ''
  };

  accion: string;
  id: string;
  contIntentos = 0;
  guardando = false;

  leyendoGrados = false;
  leyendoInstituciones = false;
  leyendoRoles = false;

  Roles: Rol[] = [];
  Instituciones: Institucion[] = [];
  Grados: Grado[] = [];

  advertenciaInstituciones = '';
  advertenciaGrados = '';
  advertenciaRoles = '';

  esRegistroEstudiante: false;

  constructor(public dialogRef: MatDialogRef<DlgUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private genService: ServiciosService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data);

    this.accion = this.data.accion;
    this.id = this.data.idusuario;
    this.esRegistroEstudiante = this.data.esRegistroEstudiante;
    this.usuario.idinstitucion = this.data.idInstitucion;

    this.obtenerUsuario();
    this.leerRoles();
    this.leerInstituciones();
    this.leerGrados();
  }

  obtenerUsuario() {
    if (this.accion === 'Editar') {
      this.genService.getUsuario(this.id).subscribe((rUsuario: Usuario) => {
        this.usuario = rUsuario;
      });
    }
  }

  leerRoles() {

    this.leyendoRoles = true;

    this.genService.getRoles().subscribe((rRoles: any) => {
      this.Roles = rRoles.Roles;
      console.log(rRoles);
      this.leyendoRoles = false;
      this.advertenciaRoles = '';

      for (const rol of this.Roles) {
        if (rol.nombre === 'Estudiante' ) {
          this.usuario.idrol = rol.idrol;
          return;
        }
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
      this.leerGrados();
    });
  }

  leerInstituciones() {

    this.leyendoInstituciones = true;

    this.genService.getInstituciones().subscribe((rInstituciones: any) => {
      this.Instituciones = rInstituciones.Instituciones;
      console.log(rInstituciones);
      this.leyendoInstituciones = false;
      this.advertenciaInstituciones = '';
    });
  }

  guardarUsuario() {

    this.guardando = true;

    if (this.accion === 'Crear') {

      const password = new Md5().appendStr(this.usuario.contra).end().toString();
      this.usuario.contra = password;

      const datos = JSON.stringify(this.usuario);
      this.genService.postUsuario(datos).subscribe((rRespuesta: any) => {

        this.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      });
    } else {

      const password = new Md5().appendStr(this.usuario.contra).end().toString();
      this.usuario.contra = password;

      const datos = JSON.stringify(this.usuario);

      this.genService.putUsuario(datos).subscribe((rRespuesta: any) => {

        this.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
        return this.dialogRef.close(rRespuesta.Respuesta || rRespuesta.Error);
      });
    }
  }

  mostrarSnackBar(titulo: string, msg: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {Titulo: titulo, Mensaje: msg}, duration: 5000
    });
  }

}
