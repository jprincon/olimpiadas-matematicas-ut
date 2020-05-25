import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Usuario } from '../../Interfaces/interfaces.interface';
import { DialogService } from '../../Servicios/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styles: []
})
export class RecuperarContraComponent implements OnInit {

  Usuario =  '';
  nUsuario = '';
  bRecuperando = false;
  bRecupero = false;
  bActualizando = false;
  usuario: Usuario = {};

  tipo = '';
  clave = '';

  Contra1 = '';
  Contra2 = '';

  LinkRecuperar = 'http://jprincon.com/olimpiadas/#/recuperar-contra/';

  constructor(private genService: ServiciosService,
              private dlgService: DialogService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerParametros();
  }

  obtenerParametros() {
    this.activatedRoute.params.subscribe((rParams: any) => {
      console.log(rParams);
      this.tipo = rParams.id;
      this.clave = this.tipo;
      this.nUsuario = rParams.idUsuario;
    });
  }

  recuperarNuevaContra() {
    if (this.Contra1 === this.Contra2) {
      this.bActualizando = true;
      this.obtenerUsuario();
    } else {
      this.dlgService.DlgMensaje('Error', 'Las contraseñas no son iguales');
    }
  }

  obtenerUsuario() {
    this.genService.getUsuario(this.nUsuario).subscribe((rUsuario: Usuario) => {
      this.usuario = rUsuario;
      console.log(rUsuario);

      if (rUsuario.nombre) {
        const clave = new Md5().appendStr(JSON.stringify(this.usuario)).end().toString();
        console.log(clave);
        if (clave === this.clave) {
          this.actualizarUsuario();
        } else {
          this.dlgService.mostrarSnackBar('Error', 'El Link esta corrupto');
          this.router.navigate(['inicio']);
        }
      } else  {
        this.dlgService.mostrarSnackBar('Error', 'Ocurrio un problema en la recuperación, intente de nuevo por favor');
        this.router.navigate(['inicio']);
      }

    }, error => {
      this.obtenerUsuario();
    });
  }

  actualizarUsuario() {
    const password = new Md5().appendStr(this.Contra1).end().toString();
    this.usuario.contra = password;
    const datos = JSON.stringify(this.usuario);
    this.genService.putUsuario(datos).subscribe((rRespuesta: any) => {
      this.dlgService.mostrarSnackBar('Información', rRespuesta.Respuesta || rRespuesta.Error);
      this.router.navigate(['inicio']);
    }, error => {
      this.actualizarUsuario();
    });
  }

   recuperarContra() {
    this.bRecuperando = true;
    this.bRecupero = false;

    this.genService.getUsuario(this.Usuario).subscribe((rUsuario: any) => {
      if (rUsuario.Respuesta) {
        this.dlgService.DlgMensaje('Error', 'El Usuario no esta registrado');
      } else {
        // Enviar Link al Correo
        this.usuario = rUsuario;
        const sLink = this.LinkRecuperar + new Md5().appendStr(JSON.stringify(rUsuario)).end().toString() + '/' + this.Usuario;

        const link = {Link: sLink, Correo: this.usuario.correo};
        const datos = JSON.stringify(link);

        this.enviarLink(datos);
      }
    }, error => {
      this.recuperarContra();
    });
  }

  enviarLink(datos: string) {
    this.genService.postLinkRecuperarContra(datos).subscribe((rRespuesta: any) => {
      console.log(rRespuesta);

      if (rRespuesta) {
        if (rRespuesta.Respuesta) {
          this.bRecupero = rRespuesta.Respuesta === 'Correcto';
          this.bRecuperando = false;
        } else if (rRespuesta.Error){
          this.dlgService.DlgMensaje('Error', 'Lo sentimos, esta cuenta no tiene asociado un correo, por favor escriba al administrador');
          this.dlgService.mostrarSnackBar('Error', rRespuesta.Error);
        }
      }
    }, error => {
      this.enviarLink(datos);
    });
  }

}
