import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../Servicios/dialog.service';
import { ServiciosService } from '../../Servicios/servicios.service';
import { Usuario } from '../../Interfaces/interfaces.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { TransferenciaService } from '../../Servicios/transferencia.service';
import { DialogoEsperaService } from '../../Servicios/dialogo-espera.service';
import { LS_CLAVE, LS_USUARIO, RUTA_MENU_PRINCIPAL } from '../../config/constantes';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  iniciando = false;
  Usuario = '';
  Contra = '';
  usuario: Usuario = {};

  constructor(private router: Router,
              private dlgService: DialogService,
              private transfer: TransferenciaService,
              private genService: ServiciosService,
              private dialogoEsperaService: DialogoEsperaService) { }

  ngOnInit() {
  }

  recuperarContra() {
    this.router.navigate(['recuperar-contra', 'recuperar', 'contra-olimpiadas-matematicas']);
  }

  IniciarSesion() {
    // %%%%%%% Iniciar el dialogo de espera %%%%%%%
    this.dialogoEsperaService.mostrarDialogoEspera('Iniciando Sesión ...');

    this.genService.getUsuario(this.Usuario).subscribe((rUsuario: any) => {

      console.log(rUsuario);

      this.dialogoEsperaService.cerrarDialogoEspera();

      if (!rUsuario) {
        return;
      }

      if (rUsuario.Respuesta === 'Consulta con resultado vacio') {
        this.dlgService.DlgMensaje('Advertencia', 'El usuario no está registrado');
        return;
      }

      this.usuario = rUsuario;

      const password = new Md5().appendStr(this.Contra).end().toString();
      if (password === this.usuario.contra) {
        this.genService.navegar([RUTA_MENU_PRINCIPAL]);
        this.transfer.enviarUsuario(this.usuario);

        // %%%%%%% Guardar datos en el LocalStorage %%%%%%%
        localStorage.setItem(LS_USUARIO, this.usuario.idusuario);

        // %%%%%%% Generar una clave de inicio %%%%%%%
        const Clave = this.usuario.correo + this.usuario.contra + this.usuario.telefono;
        const ClaveMD5 = new Md5().appendStr(Clave).end().toString();
        localStorage.setItem(LS_CLAVE, ClaveMD5);

      } else {
        this.dlgService.DlgMensaje('Error', 'Contraseña Incorrecta');
      }
    });
  }

}
