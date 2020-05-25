import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Interfaces/interfaces.interface';
import { ServiciosService } from '../../Servicios/servicios.service';
import { TransferenciaService } from '../../Servicios/transferencia.service';
import { Rol, Institucion, Grado } from '../../Interfaces/interfaces.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { DialogService } from '../../Servicios/dialog.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styles: []
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: Usuario = {};

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

  constructor(private genService: ServiciosService,
              private dlgService: DialogService,
              private transfer: TransferenciaService) { }

  ngOnInit() {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.transfer.obtenerUsuario.subscribe((rUsuario: Usuario) => {
      console.log(rUsuario);
      this.usuario = rUsuario;

      this.leerRoles();
      this.leerInstituciones();
      this.leerGrados();
    }, error => {
      this.obtenerUsuario();
    });
  }

  guardarUsuario() {
    this.guardando = true;

    const password = new Md5().appendStr(this.usuario.contra).end().toString();
    this.usuario.contra = password;

    const datos = JSON.stringify(this.usuario);

    this.genService.putUsuario(datos).subscribe((rRespuesta: any) => {
      this.guardando = false;
      this.dlgService.mostrarSnackBar('Información', 'Los datos se actualizaron correctamente');
    }, error => {
      this.guardarUsuario();
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
      this.leerRoles();
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
    }, error => {
        this.leerInstituciones();
    });
  }

}
