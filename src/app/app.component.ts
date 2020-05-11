import { TransferenciaService } from './Servicios/transferencia.service';
import { Component } from '@angular/core';
import { LS_USUARIO, RUTA_INICIO, LS_CLAVE, RUTA_MENU_PRINCIPAL } from './config/constantes';
import { ServiciosService } from './Servicios/servicios.service';
import { Usuario } from './Interfaces/interfaces.interface';
import { Md5 } from 'ts-md5/dist/md5';
import { DialogoEsperaService } from './Servicios/dialogo-espera.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  IdUsuario: string;
  ClaveMD5: string;

  usuario: Usuario = {};

  constructor(private genService: ServiciosService,
              private transfer: TransferenciaService,
              private dialogoEsperaService: DialogoEsperaService) {


    // %%%%%%% Iniciar Sesión %%%%%%%
    this.iniciarSesion();
  }

  iniciarSesion() {
    // %%%%%%% Inciar el dialogo de espera %%%%%%%
    this.dialogoEsperaService.mostrarDialogoEspera('Recuperando Usuario ...');

    // %%%%%%% Determinar si existe un usuario en el localStorage %%%%%%%
    if (!localStorage.getItem(LS_USUARIO)) {
      this.dialogoEsperaService.cerrarDialogoEspera();
      this.genService.navegar([RUTA_INICIO]);
      return;
    }

    // %%%%%%% Determinar si existe la clave de inicio %%%%%%%
    if (!localStorage.getItem(LS_CLAVE)) {
      this.dialogoEsperaService.cerrarDialogoEspera();
      this.genService.navegar([RUTA_INICIO]);
      return;
    }

    // %%%%%%% Obtener la Clave y Usuario del LocalStorage %%%%%%%
    this.ClaveMD5 = localStorage.getItem(LS_CLAVE);
    this.IdUsuario = localStorage.getItem(LS_USUARIO);

    // %%%%%%% Obtener Usuario y Comparar con los datos del LocalStorage %%%%%%%
    this.genService.getUsuario(this.IdUsuario).subscribe((rUsuario: Usuario) => {

      // %%%%%%% Cerrar dialogo de espera %%%%%%%
      this.dialogoEsperaService.cerrarDialogoEspera();

      this.usuario = rUsuario;

      const Clave = this.usuario.correo + this.usuario.contra + this.usuario.telefono;
      const ClaveMD5 = new Md5().appendStr(Clave).end().toString();

      // %%%%%%% Si las claves no son iguales %%%%%%%
      if (this.ClaveMD5 !== ClaveMD5) {
        this.genService.navegar([RUTA_INICIO]);
        return;
      }

      // %%%%%%% Enviar Usuario por toda la aplicación %%%%%%%
      this.transfer.enviarUsuario(this.usuario);

      // %%%%%%% Paso todos los niveles de seguridad, ir al menu-principal %%%%%%%
      this.genService.restaurarRuta();
    });
  }
}
